const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.GuildScheduledEventCreate,
    async execute(guildScheduledEvent){
        const logChannel = await getLogChannel(guildScheduledEvent.guild, 'logs_generals');
        if (!logChannel) return;
        const user = guildScheduledEvent.creator;

        const embed = new EmbedBuilder()
            .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
            .setColor('#009ECA')
            .setDescription(`${user} a **créé** un nouvel événement nommé \`${guildScheduledEvent.name}\`
            `)
            .setTimestamp()
            .setFooter({ text: guildScheduledEvent.guild.name, iconURL: guildScheduledEvent.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};