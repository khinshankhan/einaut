import { Client, Message } from "discord.js";

const client = new Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user && client.user.tag}!`);
});

client.on("message", (message: Message) => {
    if (message.author.bot) return;
    if (message.content.startsWith("++ping")) {
        message.channel.send("pong!");
    }
});

client.login();

const gracefulShutdown = () => {
    console.log("Entering graceful shutdown.");

    console.log("Graceful shutdown complete.");
    process.exit(0);
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
