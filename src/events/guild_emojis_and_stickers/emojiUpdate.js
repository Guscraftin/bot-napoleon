const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.GuildEmojiUpdate,
    async execute(oldEmoji, newEmoji){
        const logChannel = await getLogChannel(newEmoji.guild, 'logs_generals');
        if (!logChannel) return;

        const embed = new EmbedBuilder()
            .setTitle(`Modification d'un émoji`)
            .setColor('#009ECA')
            .setDescription(`**L'émoji ${newEmoji} a été modifié.**
            ${oldEmoji.name !== newEmoji.name ? `> **Nom :** \`${oldEmoji.name}\` => \`${newEmoji.name}\`` : ``}
            `)
            .setThumbnail(newEmoji.url)
            .setTimestamp()
            .setFooter({ text: newEmoji.guild.name, iconURL: newEmoji.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};