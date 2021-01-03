import { Client, Message } from "discord.js";

import { DISCORD_TOKEN } from "./utils/env";
import { prefixP, ephemeralP, mentionUserFirstP } from "./utils/utils";
import { writeToBackup } from "./utils/config";
import { closeDatabase } from "./db/db";
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

const gracefulShutdown = async () => {
    console.log("Entering graceful shutdown.");
    writeToBackup();

    // Stop our client first so we don't get events after the flush
    client.destroy();
    await closeDatabase();

    console.log("Graceful shutdown complete.");
    process.exit(0);
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
