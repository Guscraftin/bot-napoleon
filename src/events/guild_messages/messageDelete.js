const { Events } = require('discord.js');
const { Logs } = require('../../dbObjects');

module.exports = {
	name: Events.MessageDelete,
	async execute(message) {

        Logs.findOne({ where: { guild_id: message.guildId } }).then(async (log) => {
            if (!log.logs_messages) return;

            const channel = await message.guild.channels.fetch(log.logs_messages);
            if (!channel) return;

            return channel.send({ content: "Un message a été supprimé." });
        });
	},
};