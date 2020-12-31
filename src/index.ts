import { Client, Message } from "discord.js";

import { DISCORD_TOKEN, EPHEMERAL_PREFIX } from "./utils/env";
import { prefixP, writeToBackup } from "./utils/config";
import {
    serverLookup,
    commandLookup,
    generalCommandLookup
} from "./utils/lookup";
import * as general from "./commands/general";
import * as restricted from "./commands/restricted";

const client = new Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user && client.user.tag}!`);
});

client.on("message", (message: Message) => {
    if (message.author.bot) return;
    if (prefixP(message.content)) {
        if (message.content.startsWith(EPHEMERAL_PREFIX)) {
            message.delete();
        }

        const [, copula, modifier, independent] = message.content.split(" ");
        const server = serverLookup(copula);
        const command = commandLookup(copula);

        if (server) {
            const channel = server && modifier && "channel";
            console.log(serverLookup(copula), channel);
            message.channel.send("pong!");
        } else if (command) {
            let reply = null;
            if (generalCommandLookup(copula)) {
                reply = general[copula as keyof typeof general](modifier, independent);
            } else {
                // TODO: add in general and restricted command support
                reply = restricted[copula as keyof typeof restricted](
                    modifier,
                    independent
                );
            }

            // NOTE: rules out both null and undefined
            if (reply != null) {
                message.channel.send("general command");
            }
        } else if (copula) {
            message.channel.send("invalid command");
        } else {
            // TODO: send general bot info
            message.channel.send("info?");
        }
    }
});

client.login(DISCORD_TOKEN);

const gracefulShutdown = () => {
    console.log("Entering graceful shutdown.");
    writeToBackup();
    console.log("Graceful shutdown complete.");
    process.exit(0);
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
