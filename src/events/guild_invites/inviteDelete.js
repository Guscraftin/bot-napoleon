const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.InviteDelete,
    async execute(invite){
        const logChannel = await getLogChannel(ban.guild, 'logs_generals');
        if (!logChannel) return;

        const embed = new EmbedBuilder()
            .setTitle('Invitation : Suppression')
            .setColor('#009ECA')
            .setDescription(`**Invitation supprimé par ${invite.inviterId === null ? `\`un modérateur\`` : `<@${invite.inviterId}>`} dans ${invite.channel}.**
            > **Code :** \`${invite.code}\`
            ${invite.createdTimestamp === null ? `` : `> **Crée le :** <t:${parseInt(invite.createdTimestamp / 1000)}:f> <t:${parseInt(invite.createdTimestamp / 1000)}:R>\n`} > **A invité :** \`${invite.memberCount === null ? `0` : `${invite.memberCount}`}\` utilisateurs
            `)
            .setTimestamp()
            .setFooter({ text: invite.guild.name, iconURL: invite.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};