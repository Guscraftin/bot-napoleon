const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.MessageReactionRemoveAll,
    async execute(message, reactions){
        const logChannel = await getLogChannel(message.guild, 'logs_messages');
        if (!logChannel) return;
        
        const embed = new EmbedBuilder()
            .setAuthor({ name: reactions.first().client.user.username, iconURL: reactions.first().client.user.displayAvatarURL() })
            .setColor('#009ECA')
            .setDescription(`**Les réactions \`${getNameEmojis()}\` [de ce message](${message.url}) ont été supprimé par le bot <@${reactions.first().client.user.id}>.**
            `)
            .setTimestamp()
            .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })

        logChannel.send({ embeds: [embed] });


        function getNameEmojis() {
            let listEmoji = [];
            reactions.each(emoji => listEmoji.push(emoji.emoji.name));
            return listEmoji;
        }
    }
};