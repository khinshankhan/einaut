import { REGULAR_PREFIX, EPHEMERAL_PREFIX } from "./env";

export const prefixP = (prefix: string) =>
    prefix.startsWith(REGULAR_PREFIX) || prefix.startsWith(EPHEMERAL_PREFIX);
