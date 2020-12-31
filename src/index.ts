import { Client, Message } from "discord.js";

import { DISCORD_TOKEN, EPHEMERAL_PREFIX } from "./utils/env";
import { prefixp } from "./utils/config";

const client = new Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user && client.user.tag}!`);
});

client.on("message", (message: Message) => {
    if (message.author.bot) return;
    if (prefixp(message.content)) {
        if (message.content.startsWith(EPHEMERAL_PREFIX)) {
            message.delete();
        }

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
