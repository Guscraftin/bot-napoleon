const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.MessageDeleteBulk,
    async execute(messages, channel){
        const logChannel = await getLogChannel(channel.guild, 'logs_messages');
        if (!logChannel) return;

        const embed = new EmbedBuilder()
            .setTitle('💥 - Suppression en masse de message')
            .setColor('#009ECA')
            .setDescription(`**Plusieurs messages supprimés par un bot dans le salon ${channel}.**
            `)
            .setTimestamp()
            .setFooter({ text: channel.guild.name, iconURL: channel.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};