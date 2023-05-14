const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.GuildScheduledEventUpdate,
    async execute(oldGuildScheduledEvent, newGuildScheduledEvent){
        const logChannel = await getLogChannel(newGuildScheduledEvent.guild, 'logs_generals');
        if (!logChannel) return;
        const user = newGuildScheduledEvent.creator;

        const embed = new EmbedBuilder()
            .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
            .setColor('#009ECA')
            .setDescription(`${user} a **mise à jour** l'événement nommé \`${newGuildScheduledEvent.name}\`
            `)
            .setTimestamp()
            .setFooter({ text: newGuildScheduledEvent.guild.name, iconURL: newGuildScheduledEvent.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};