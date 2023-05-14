const { ChannelType, Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.ThreadDelete,
    async execute(thread){
        const logChannel = await getLogChannel(thread.guild, 'logs_generals');
        if (!logChannel) return;

        const embed = new EmbedBuilder()
            .setTitle(`Suppression d'un thread ${thread.type === ChannelType.PublicThread ? 'public' : 'privé'}`)
            .setColor('#009ECA')
            .setDescription(`Le thread ${thread.type === ChannelType.PublicThread ? `public` : `privé`} \`${thread.name}\` a été **supprimé** dans le salon ${thread.parent} par un modérateur.`)
            .setTimestamp()
            .setFooter({ text: thread.guild.name, iconURL: thread.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};