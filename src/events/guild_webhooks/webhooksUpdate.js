const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.WebhooksUpdate,
    async execute(channel){
        const logChannel = await getLogChannel(ban.guild, 'logs_moderation');
        if (!logChannel) return;

        let numberWebhooks;
        await channel.fetchWebhooks().then(function (hooks) {
            numberWebhooks = hooks.size;
        });

        const embed = new EmbedBuilder()
            .setTitle(`Webhook : Mise à jour`)
            .setColor('#009ECA')
            .setDescription(`Un \`webhook\` a été **mis à jour** dans le salon ${resultChannelType()} <#${channel.id}> ||(\`${channel.name}\`)||.
            > **Nombre de webhooks dans le salon :** \`${numberWebhooks}\`
            `)
            .setTimestamp()
            .setFooter({ text: channel.guild.name, iconURL: channel.guild.iconURL() })

        logChannel.send({ embeds: [embed] });

        function resultChannelType() {
            switch (channel.type) {
                case 0 :
                    return `textuel`;
                case 2 :
                    return `vocal`;
                case 5 :
                    return `annonce`;
                default:
                    return ``;
            }
        }
    }
};