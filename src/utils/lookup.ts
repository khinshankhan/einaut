import { SERVERS_LOOKUP } from "./env";

export const serverLookup = (potentialServer: string) =>
    SERVERS_LOOKUP[potentialServer as keyof typeof SERVERS_LOOKUP];

// TODO: add in logic and separate into general vs restricted
export const commandLookup = (potentialCommand: string) =>
    potentialCommand && true;
