import { Message, MessageMentions } from "discord.js";
import { REGULAR_PREFIX, EPHEMERAL_PREFIX } from "./env";

export const regularP = (content: string) =>
    REGULAR_PREFIX && content.startsWith(REGULAR_PREFIX);

export const ephemeralP = (content: string) =>
    EPHEMERAL_PREFIX && content.startsWith(EPHEMERAL_PREFIX);

export const prefixP = (content: string) =>
    regularP(content) || ephemeralP(content);

export const mentionUserP = (mentions: MessageMentions, id: string) =>
    mentions.has(id, { ignoreRoles: true, ignoreEveryone: true });

export const mentionUserFirstP = (message: Message, id: string) => {
    if (mentionUserP(message.mentions, id)) {
        // HACK: too lazy to use MessageMentions.USER_PATTERN regex
        // if users are being weird enough to mention the bot like this, why not help them
        const mentionIndex = message.content.indexOf(id);
        return mentionIndex > 1 && mentionIndex < 4;
    }

    return false;
};
