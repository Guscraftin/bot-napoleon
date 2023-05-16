const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.GuildEmojiDelete,
    async execute(emoji){
        const logChannel = await getLogChannel(emoji.guild, 'logs_generals');
        if (!logChannel) return;

        const embed = new EmbedBuilder()
            .setTitle(`Suppression d'un emoji`)
            .setColor('#009ECA')
            .setDescription(`**L'emoji \`${emoji.name}\` a été supprimé.**
            > **Nom:Id :** \`${emoji.identifier}\`
            > **Auteur :** ${emoji.author === null ? `\`un modérateur\`` : `<@${emoji.author.id}>`}
            > **Emoji animé :** \`${emoji.animated ? `Oui` : `Non` }\`
            `)
            .setThumbnail(emoji.url)
            .setTimestamp()
            .setFooter({ text: emoji.guild.name, iconURL: emoji.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};