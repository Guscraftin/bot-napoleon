const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.StageInstanceCreate,
    async execute(stageInstance){
        const logChannel = await getLogChannel(stageInstance.guild, 'logs_generals');
        if (!logChannel) return;

        const embed = new EmbedBuilder()
            .setTitle(`Création d'une conférence`)
            .setColor('#009ECA')
            .setDescription(`La conférence \`${stageInstance.topic}\` a été **créée** dans le salon ${stageInstance.channel}.
            ${stageInstance.guildScheduledEvent != null ? `> **Evenement lié :** [${stageInstance.guildScheduledEvent.name}](${stageInstance.guildScheduledEvent})` : ``}
            `)
            .setTimestamp()
            .setFooter({ text: stageInstance.guild.name, iconURL: stageInstance.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};