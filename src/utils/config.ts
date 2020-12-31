import fs from "fs";

import { DISCORD_TOKEN, REGULAR_PREFIX, EPHEMERAL_PREFIX } from "./env";
import { servers } from "./servers";

const createServersStructure = (lookup: { [key: string]: string }) =>
    Object.entries(lookup).reduce((stored, [shortcut, serverLink]) => {
        if (stored[shortcut]) {
            return {
                ...stored,
                [serverLink]: [...stored[shortcut], shortcut]
            };
        }
        return { ...stored, [serverLink]: [shortcut] };
    }, {} as { [key: string]: string[] });

const createBackup = () => ({
    BOT: {
        DISCORD_TOKEN,
        REGULAR_PREFIX,
        EPHEMERAL_PREFIX
    },
    SERVERS: createServersStructure(servers)
});

export const writeToBackup = () =>
    fs.writeFileSync("backup.json", JSON.stringify(createBackup(), null, 2));
