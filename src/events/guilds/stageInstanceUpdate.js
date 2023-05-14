const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.StageInstanceUpdate,
    async execute(oldStageInstance, newStageInstance){
        const logChannel = await getLogChannel(newStageInstance.guild, 'logs_generals');
        if (!logChannel) return;

        const embed = new EmbedBuilder()
            .setTitle(`Modification d'une conférence`)
            .setColor('#009ECA')
            .setDescription(`**La conférence \`${newStageInstance.topic}\` a été modifiée dans le salon ${newStageInstance.channel}.**
            > **Sujet :** \`${oldStageInstance.topic}\` => \`${newStageInstance.topic}\`
            `)
            .setTimestamp()
            .setFooter({ text: newStageInstance.guild.name, iconURL: newStageInstance.guild.iconURL() })

        logChannel.send({ embeds: [embed] });
    }
};