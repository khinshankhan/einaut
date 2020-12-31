import { SERVERS } from "./env";

export const serverLookup = (potentialServer: string) =>
    SERVERS[potentialServer as keyof typeof SERVERS];

// TODO: add in logic and separate into general vs restricted
export const commandLookup = (potentialCommand: string) =>
    potentialCommand && true;
