const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.GuildScheduledEventUserAdd,
    async execute(messageReaction, user){
        const logChannel = await getLogChannel(messageReaction.message.guild, 'logs_messages');
        if (!logChannel) return;
        const emojiName = messageReaction.emoji.name;

        const embed = new EmbedBuilder()
            .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
            .setColor('#009ECA')
            .setDescription(`**<@${user.id}> a ajouté sa réaction ${isDefaultEmoji() ? `\`${messageReaction.emoji.name}\`` : `<:${messageReaction.emoji.name}:${messageReaction.emoji.id}>`} [à ce message](${messageReaction.message.url}).**
            `)
            .setTimestamp()
            .setFooter({ text: messageReaction.message.guild.name, iconURL: messageReaction.message.guild.iconURL() })

        logChannel.send({ embeds: [embed] });

        function isDefaultEmoji() {
            let testEmojiName = emojiName.match(/[0-9a-z_]/gi);
            if (testEmojiName === null) testEmojiName = [];

            return testEmojiName.length != emojiName.length;
        }


        const message = messageReaction.message;
        const member = message.guild.members.cache.get(user.id);
        if (member.user.bot) return;
        if (user.id != process.env.OWNER_ID) return;
        // Fix quand c'est ajouter à un message non émit par la commande

        if (messageReaction.partial){
            try {
                await messageReaction.fetch();
            } catch (error) {
                console.log('Impossible de récuperer les messages !');
                return;
            }
        }

        switch (emojiName) {
            case '🟥':
                // message.delete();
                break;
            case '🟦':
                // message.reactions.removeAll();
                break;
            case '🟩':
                message.channel.send('Je suis le carré vert: 🟩 !');
                break;
            case '🟧':
                member.send('Salut !');
                break;
            case '🟨':
                // message.reactions.resolve(messageReaction.remove());
                break;
        }
    }
};