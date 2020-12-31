import { SERVERS } from "./env";

export const serverLookup = (potentialServer: string) =>
    SERVERS[potentialServer as keyof typeof SERVERS];
