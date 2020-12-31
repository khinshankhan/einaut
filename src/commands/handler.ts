import { Message } from "discord.js";
import {
    serverLookup,
    commandLookup,
    generalCommandLookup
} from "../utils/lookup";
import * as general from "./general";
import * as restricted from "./restricted";

export const handleMessage = (message: Message) => {
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
};
