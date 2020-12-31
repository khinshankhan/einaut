import configJson from "../config/config.json";

const { BOT, SERVERS } = configJson;
const { DISCORD_TOKEN, REGULAR_PREFIX, EPHEMERAL_PREFIX } = BOT;

// TODO: process SERVERS before export

export { DISCORD_TOKEN, REGULAR_PREFIX, EPHEMERAL_PREFIX, SERVERS };
