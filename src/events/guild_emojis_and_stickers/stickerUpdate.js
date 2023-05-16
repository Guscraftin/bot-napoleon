const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.GuildStickerUpdate,
    async execute(oldSticker, newSticker){
        const logChannel = await getLogChannel(newSticker.guild, 'logs_generals');
        if (!logChannel) return;

        const embed = new EmbedBuilder()
            .setTitle(`Modification d'un autocollant`)
            .setColor('#009ECA')
            .setDescription(`**L'autocollant \`${newSticker.name}\` a été modifié.**
            ${oldSticker.name !== newSticker.name ? `> **Nom :** \`${oldSticker.name}\` => \`${newSticker.name}\`\n` : `` } ${oldSticker.tags !== newSticker.tags ? `> **Emoji similaire :** :${oldSticker.tags}: => :${newSticker.tags}:\n` : `` } ${oldSticker.description !== newSticker.description ? `>>> **Description :** \`\`\`${oldSticker.description}\`\`\` **=>** \`\`\`${newSticker.description}\`\`\`` : `` }
            `)
            .setImage(newSticker.url)
            .setTimestamp()
            .setFooter({ text: newSticker.guild.name, iconURL: newSticker.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};