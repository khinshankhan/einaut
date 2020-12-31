import configJson from "../config/config.json";

const { BOT, SERVERS } = configJson;
const { DISCORD_TOKEN, REGULAR_PREFIX, EPHEMERAL_PREFIX } = BOT;

/* restructure server data to be in the form of:
   {
   [shortcut]: serverLink,
   }
*/
const SERVERS_LOOKUP = Object.entries(SERVERS).reduce(
    (stored, [serverLink, shortcuts]) => ({
        ...stored,
        ...shortcuts.reduce(
            (merged, shortcut) => ({
                ...merged,
                [shortcut]: serverLink
            }),
            {}
        )
    }),
    {}
);

export { DISCORD_TOKEN, REGULAR_PREFIX, EPHEMERAL_PREFIX, SERVERS_LOOKUP };
