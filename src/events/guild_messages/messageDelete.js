const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.MessageDelete,
    async execute(message){
        const logChannel = await getLogChannel(message.guild, 'logs_messages');
        if (!logChannel) return;

        if (message.author === null) {
            const embedBot = new EmbedBuilder()
                .setTitle(`Suppression d'un message`)
                .setColor('#009ECA')
                .setDescription(`**Message envoyé par \`un membre\` supprimé dans ${message.channel}.**
                `)
                .setTimestamp()
                .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })

            logChannel.send({ embeds: [embedBot] });
        } else {
            const embed = new EmbedBuilder()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('#009ECA')
                .setDescription(`**Message envoyé par ${message.author} supprimé dans ${message.channel}.**
                ${message.content}
                `)
                .setTimestamp()
                .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })

            logChannel.send({ embeds: [embed] });
        }  
    }
};