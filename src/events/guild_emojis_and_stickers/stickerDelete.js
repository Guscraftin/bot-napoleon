const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.GuildStickerDelete,
    async execute(sticker){
        const logChannel = await getLogChannel(ban.guild, 'logs_generals');
        if (!logChannel) return;

        const embed = new EmbedBuilder()
            .setTitle(`Supression d'un autocollant`)
            .setColor('#009ECA')
            .setDescription(`**L'autocollant \`${sticker.name}\` a été supprimé.**
            > **Emoji similaire :** :${sticker.tags}:
            > **Auteur :** ${sticker.user === null ? `\`un modérateur\`` : `<@${sticker.user.id}>`}
            ${sticker.description !== '' ? `>>> **Description :** \`\`\`${sticker.description}\`\`\`` : `` }
            `)
            .setImage(sticker.url)
            .setTimestamp()
            .setFooter({ text: sticker.guild.name, iconURL: sticker.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};