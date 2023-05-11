const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.GuildBanAdd,
    async execute(ban){
        const logChannel = await getLogChannel(ban.guild, 'logs_moderation');
        if (!logChannel) return;

        let reason;
        await ban.guild.bans.fetch(ban.user).then(function (ban) {
            reason = ban.reason;
        });

        const embed = new EmbedBuilder()
            .setTitle(`Banissement`)
            .setColor('#009ECA')
            .setDescription(`**\`${ban.user.tag}\` a été banni.**
            > **Id :** \`${ban.user.id}\`
            > **Surnom :** \`${ban.user.username}\`
            > **Raison :** \`${reason === null ? `Aucune raison fourni` : `${reason}`}\`
            `)
            .setThumbnail(ban.user.displayAvatarURL())
            .setTimestamp()
            .setFooter({ text: ban.guild.name, iconURL: ban.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};