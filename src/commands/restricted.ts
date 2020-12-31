import { add as addShortcut } from "../utils/servers";

export const add = (serverLink: string, shortcut: string) =>
    addShortcut(serverLink, shortcut);
