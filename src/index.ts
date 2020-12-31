import { Client, Message } from "discord.js";

import { DISCORD_TOKEN, EPHEMERAL_PREFIX } from "./utils/env";
import { prefixP } from "./utils/config";
import { serverLookup } from "./utils/lookup";

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

        const [, command, potential] = message.content.split(" ");
        console.log(serverLookup(command), potential);
        message.channel.send("pong!");
    }
});

client.login(DISCORD_TOKEN);

const gracefulShutdown = () => {
    console.log("Entering graceful shutdown.");
    // TODO: create backup cache here
    console.log("Graceful shutdown complete.");
    process.exit(0);
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
