const { Collection } = require('discord.js');
const { Logs } = require('./dbObjects');


/*
 *   @param guild_id: the id of the guild
 *   @param logs: the logs object of the guild
 *   @return: the log channel of the guild
 */
async function getLogChannel(guild, logsType) {
    try {
        const logs = await Logs.findOne({ where: { guild_id: guild.id } });
        if (!logs || !logs[logsType] || logs[logsType] === 0) return;

        const logChannel = await guild.channels.fetch(logs[logsType]);
        if (logChannel instanceof Collection) return;

        return logChannel;
    } catch (error) {
        console.error(error);
        return;
    }
}


module.exports = { getLogChannel };