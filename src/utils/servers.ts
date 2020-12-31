import { SERVERS_LOOKUP } from "./env";

export const servers = SERVERS_LOOKUP;

export const add = (serverLink: string, shortcut: string) => {
    servers[shortcut] = serverLink;
};
