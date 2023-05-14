const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.MessageReactionRemoveEmoji,
    async execute(reaction){
        const logChannel = await getLogChannel(reaction.message.guild, 'logs_messages');
        if (!logChannel) return;
        
        const embed = new EmbedBuilder()
            .setAuthor({ name: reaction.client.user.username, iconURL: reaction.client.user.displayAvatarURL() })
            .setColor('#009ECA')
            .setDescription(`**La réaction \`${reaction.emoji.name}\` [de ce message](${reaction.message.url}) a été supprimé par le bot <@${reaction.client.user.id}>.**
            `)
            .setTimestamp()
            .setFooter({ text: reaction.message.guild.name, iconURL: reaction.message.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};