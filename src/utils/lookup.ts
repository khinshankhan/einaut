import { SERVERS_LOOKUP } from "./env";
import * as general from "../commands/general";
import * as restricted from "../commands/restricted";

// HACK: eventually move to better logic for determining of a string is a valid command
const generalCommands = Object.keys(general);
const restrictedCommands = Object.keys(restricted);

export const serverLookup = (potentialServer: string) =>
    SERVERS_LOOKUP[potentialServer as keyof typeof SERVERS_LOOKUP];

export const generalCommandLookup = (potentialCommand: string) =>
    generalCommands.some(command => command === potentialCommand);

export const restrictedCommandLookup = (potentialCommand: string) =>
    restrictedCommands.some(command => command === potentialCommand);

export const commandLookup = (potentialCommand: string) =>
    generalCommandLookup(potentialCommand) ||
    restrictedCommandLookup(potentialCommand);
