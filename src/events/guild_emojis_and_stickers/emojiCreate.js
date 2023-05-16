const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.GuildEmojiCreate,
    async execute(emoji){
        const logChannel = await getLogChannel(emoji.guild, 'logs_generals');
        if (!logChannel) return;

        const embed = new EmbedBuilder()
            .setTitle(`Création d'un emoji`)
            .setColor('#009ECA')
            .setDescription(`**L'emoji ${emoji} a été créé par ${emoji.author === null ? `\`un modérateur\`` : `<@${emoji.author.id}>`}.**
            > **Nom:Id :** \`${emoji.identifier}\`
            > **Emoji animé :** \`${emoji.animated ? `Oui` : `Non` }\`
            `)
            .setThumbnail(emoji.url)
            .setTimestamp()
            .setFooter({ text: emoji.guild.name, iconURL: emoji.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};