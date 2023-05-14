const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.MessageReactionRemove,
    async execute(messageReaction, user){
        const logChannel = await getLogChannel(messageReaction.message.guild, 'logs_messages');
        if (!logChannel) return;
        const emojiName = messageReaction.emoji.name;
        
        const embed = new EmbedBuilder()
            .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
            .setColor('#009ECA')
            .setDescription(`**<@${user.id}> a retiré sa réaction ${isDefaultEmoji() ? `\`${messageReaction.emoji.name}\`` : `<:${messageReaction.emoji.name}:${messageReaction.emoji.id}>`} [à ce message](${messageReaction.message.url}).**
            `)
            .setTimestamp()
            .setFooter({ text: messageReaction.message.guild.name, iconURL: messageReaction.message.guild.iconURL() })

        logChannel.send({ embeds: [embed] });

        function isDefaultEmoji() {
            let testEmojiName = emojiName.match(/[0-9a-z_]/gi);
            if (testEmojiName === null) testEmojiName = [];

            return testEmojiName.length != emojiName.length;
        }
    }
};