const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.MessageUpdate,
    async execute(oldMessage, newMessage){
        const logChannel = await getLogChannel(newMessage.guild, 'logs_messages');
        if (!logChannel) return;

        const oldContentMessage = oldMessage.content;
        const newContentMessage = newMessage.content;

        if (oldMessage.channelId === logChannel.id) return;

        let embed = new EmbedBuilder()
            .setAuthor({ name: newMessage.author.tag, iconURL: newMessage.author.displayAvatarURL() })
            .setColor('#009ECA')
            .setTimestamp()
            .setFooter({ text: newMessage.guild.name, iconURL: newMessage.guild.iconURL() })

        // Logs for pinned messages
        if (oldMessage.pinned != newMessage.pinned) {
            embed
                .setDescription(`**Message envoyé par <@${newMessage.author.id}> ${newMessage.pinned === true ? "épinglé" : "désépinglé"} dans ${newMessage.channel}.** [Aller au message.](${newMessage.url})
                `)

        } // Logs for edited messages
        else if ((oldContentMessage === null || oldContentMessage.length <= 1024) && newContentMessage.length <= 1024) {
            embed
                .setDescription(`**Message envoyé par <@${newMessage.author.id}> modifié dans ${newMessage.channel}.** [Aller au message.](${newMessage.url})
                `)
                .addFields([
                    {name: `\`🔅\` - Ancien - \`🔅\``, value: `\`\`\`${oldContentMessage}\`\`\``},
                    {name: `\`🔅\` - Nouveau - \`🔅\``, value: `\`\`\`${newContentMessage}\`\`\``}
                ])

        } else { return; }

        logChannel.send({ embeds: [embed] });
    }
};