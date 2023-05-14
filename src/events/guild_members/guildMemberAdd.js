const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member){
        const logChannel = await getLogChannel(member.guild, 'logs_members');
        if (!logChannel) return;

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL() })
            .setColor('#21ff81')
            .setDescription(`• Nom d'utilisateur : ${member} - \`${member.user.tag}\` (${member.id})
            • Créé le : <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
            • Rejoint le : <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
            `)
            .setTimestamp()
            .setFooter({ text: "L'utilisateur a rejoint !" })

        logChannel.send({ embeds: [embed] });
    }
};