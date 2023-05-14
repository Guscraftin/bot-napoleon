const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.ChannelDelete,
    async execute(channel){
        const logChannel = await getLogChannel(channel.guild, 'logs_channels');
        if (!logChannel) return;

        if (channel.type === 4) {
            const embedCategorie = new EmbedBuilder()
                .setTitle(`Suppression d'une catégorie`)
                .setColor('#009ECA')
                .setDescription(`**La catégorie \`${channel.name}\` a été supprimé**.
                > **Id :** \`${channel.id}\`
                `)
                .setTimestamp()
                .setFooter({ text: channel.guild.name, iconURL: channel.guild.iconURL() })
        
            logChannel.send({ embeds: [embedCategorie] });
        } else {
            const embed = new EmbedBuilder()
                .setTitle(`Suppression d'un salon`)
                .setColor('#009ECA')
                .setDescription(`**La salon \`${channel.name}\` a été supprimé**.
                > **Id :** \`${channel.id}\`
                > **Catégorie :** ${channel.parent}
                > **Type :** \`${channelType()}\`
                `)
                .setTimestamp()
                .setFooter({ text: channel.guild.name, iconURL: channel.guild.iconURL() })
        
            logChannel.send({ embeds: [embed] });
        }

        function channelType() {
            switch (channel.type) {
                case 0 :
                    return 'Textuel';
                case 2 :
                    return 'Vocal';
            }
        }
    }
};