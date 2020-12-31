import { Client, Message } from "discord.js";

import { DISCORD_TOKEN } from "./utils/env";
import { prefixP, ephemeralP, mentionUserFirstP } from "./utils/utils";
import { writeToBackup } from "./utils/config";
import { handleMessage } from "./commands/handler";

const client = new Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user!.tag}!`);
});

client.on("message", (message: Message) => {
    if (message.author.bot) return;

    if (prefixP(message.content) || mentionUserFirstP(message, client.user!.id)) {
        if (ephemeralP(message.content)) {
            message.delete();
        }

        handleMessage(message);
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
