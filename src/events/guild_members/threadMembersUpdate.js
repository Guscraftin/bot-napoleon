const { ChannelType, Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.ThreadMembersUpdate,
    async execute(addedMembers, removedMembers, thread){
        const logChannel = await getLogChannel(thread.guild, 'logs_members');
        if (!logChannel) return;

        const embed = new EmbedBuilder()
            .setTitle(`Thread : Membre`)
            .setColor('#009ECA')
            .setDescription(`La liste des membres du thread ${thread.type === ChannelType.PublicThread ? `public` : `privé`} <#${thread.id}> (\`${thread.name}\`) a été **mis à jour** dans le salon ${thread.parent}.
            ${addedMembers.size > 0 ? `> ✅ : <@${addedMembers.firstKey()}>` : ``} ${removedMembers.size > 0 ? `> ❌ : <@${removedMembers.firstKey()}>` : ``}
            `)
            .setTimestamp()
            .setFooter({ text: thread.guild.name, iconURL: thread.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};