const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.GuildBanRemove,
    async execute(ban){
        const logChannel = await getLogChannel(ban.guild, 'logs_moderation');
        if (!logChannel) return;

        const embed = new EmbedBuilder()
            .setTitle(`Débanissement`)
            .setColor('#009ECA')
            .setDescription(`**\`${ban.user.tag}\` a été débanni.**
            > **Id :** \`${ban.user.id}\`
            > **Surnom :** \`${ban.user.username}\`
            > **Raison :** \`${ban.reason === null ? `Aucune raison fourni` : `${ban.reason}`}\`
            `)
            .setThumbnail(ban.user.displayAvatarURL())
            .setTimestamp()
            .setFooter({ text: ban.guild.name, iconURL: ban.guild.iconURL() })
        
        logChannel.send({ embeds: [embed] });
    }
};