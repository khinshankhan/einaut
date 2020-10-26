import { Client, Message } from "discord.js";
require("dotenv").config();

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
