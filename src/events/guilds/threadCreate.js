const { ChannelType, Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.ThreadCreate,
    async execute(thread){
        const logChannel = await getLogChannel(thread.guild, 'logs_channels');
        if (!logChannel) return;
        const ownerThread = await thread.members.fetch(thread.ownerId);
        

        if (thread.type === ChannelType.PublicThread || thread.type === ChannelType.PrivateThread) {
            thread.join();

            const embed = new EmbedBuilder()
                .setAuthor({ name: `Création d'un thread ${thread.type === ChannelType.PublicThread ? `public` : `privé`} - ${ownerThread.user.tag}`, iconURL: ownerThread.user.displayAvatarURL() })
                .setColor('#009ECA')
                .setDescription(`Le thread ${thread.type === ChannelType.PublicThread ? `public` : `privé`} <#${thread.id}> (\`${thread.name}\`) a été **créé** dans le salon ${thread.parent} par <@${thread.ownerId}>.`)
                .setTimestamp()
                .setFooter({ text: thread.guild.name, iconURL: thread.guild.iconURL() })

            logChannel.send({ embeds: [embed] });
        }
    }
};