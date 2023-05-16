const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.GuildStickerCreate,
    async execute(sticker){
        const logChannel = await getLogChannel(sticker.guild, 'logs_generals');
        if (!logChannel) return;

        const embed = new EmbedBuilder()
            .setTitle(`Création d'un autocollant`)
            .setColor('#009ECA')
            .setDescription(`**L'autocollant \`${sticker.name}\` a été créé par ${sticker.user === null ? `\`un modérateur\`` : `<@${sticker.user.id}>`}.**
            > **Emoji similaire :** :${sticker.tags}:
            ${sticker.description !== '' ? `>>> **Description :** \`\`\`${sticker.description}\`\`\`` : `` }
            `)
            .setImage(sticker.url)
            .setTimestamp()
            .setFooter({ text: sticker.guild.name, iconURL: sticker.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};