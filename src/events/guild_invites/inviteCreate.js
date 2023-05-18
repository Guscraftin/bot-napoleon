const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.InviteCreate,
    async execute(invite){
        const logChannel = await getLogChannel(invite.guild, 'logs_generals');
        if (!logChannel) return;

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${invite.inviter.tag}`, iconURL: invite.inviter.displayAvatarURL() })
            .setColor('#009ECA')
            .setDescription(`**Invitation crée par ${invite.inviter} dans ${invite.channel}.**
            > **Code :** \`${invite.code}\`
            > **Expire le :** ${ invite.expiresTimestamp ? `<t:${parseInt(invite.expiresTimestamp / 1000)}:f> <t:${parseInt(invite.expiresTimestamp / 1000)}:R>` : `\`Jamais\``}
            > **Nombre d'utilisateur maximum :** ${invite.maxUses === 0 ? `\`Illimité\`` : `\`${invite.maxUses}\``}
            `)
            .setTimestamp()
            .setFooter({ text: invite.guild.name, iconURL: invite.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};