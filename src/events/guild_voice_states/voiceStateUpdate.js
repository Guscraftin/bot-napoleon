const { ChannelType, Events, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { Vocals } = require('../../dbObjects');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState){
        /*
         * Logs
         */
        const logChannel = await getLogChannel(oldState.guild, 'logs_generals');
        if (logChannel) {
        if (oldState.channel === null) {
            const embedJoin = new EmbedBuilder()
                .setAuthor({ name: newState.member.user.tag, iconURL: newState.member.displayAvatarURL() })
                .setColor('#009ECA')
                .setDescription(`<@${newState.member.id}> **a rejoint le salon vocal ${newState.channel} ||(\`${newState.channel.name}\`)||.**
                `)
                .setTimestamp()
                .setFooter({ text: newState.guild.name, iconURL: newState.guild.iconURL() })

            logChannel.send({ embeds: [embedJoin] });

        } else if (newState.channel === null) {
            const embedLeave = new EmbedBuilder()
                .setAuthor({ name: oldState.member.user.tag, iconURL: oldState.member.displayAvatarURL() })
                .setColor('#009ECA')
                .setDescription(`<@${oldState.member.id}> **a quitté le salon vocal ${oldState.channel} ||(\`${oldState.channel.name}\`)||.**
                `)
                .setTimestamp()
                .setFooter({ text: oldState.guild.name, iconURL: oldState.guild.iconURL() })

            logChannel.send({ embeds: [embedLeave] });
        
        } else if (oldState.channelId != newState.channelId) {
            const embedMove = new EmbedBuilder()
                .setAuthor({ name: oldState.member.user.tag, iconURL: oldState.member.displayAvatarURL() })
                .setColor('#009ECA')
                .setDescription(`<@${oldState.member.id}> **a changé de salon vocal ${oldState.channel} => ${newState.channel}.**
                ||(\`${oldState.channel.name}\` => \`${newState.channel.name}\`)||
                `)
                .setTimestamp()
                .setFooter({ text: oldState.guild.name, iconURL: oldState.guild.iconURL() })

            logChannel.send({ embeds: [embedMove] });

        } else {
            const embedDeaf = new EmbedBuilder()
                .setAuthor({ name: oldState.member.user.tag, iconURL: oldState.member.displayAvatarURL() })
                .setColor('#009ECA')
                .setDescription(`**Le statut du micro de <@${oldState.member.id}> à été mis à jour dans le salon vocal ${oldState.channel} ||(\`${oldState.channel.name}\`)||.**
                ${!oldState.selfMute && newState.selfMute ? `> 🎙 **Muet :** \`Désactivé\` => \`Activé\`\n` : ``} ${oldState.selfMute && !newState.selfMute ? `> 🎙 **Muet :** \`Activé\` => \`Désactivé\`\n` : ``} ${!oldState.selfDeaf && newState.selfDeaf ? `> 🔈 **Sourd :** \`Désactivé\` => \`Activé\`\n` : ``} ${oldState.selfDeaf && !newState.selfDeaf ? `> 🔈 **Sourd :** \`Activé\` => \`Désactivé\`\n` : ``} ${!oldState.serverMute && newState.serverMute ? `> 🎙 **Muet par un modo :** \`Désactivé\` => \`Activé\`\n` : ``} ${oldState.serverMute && !newState.serverMute ? `> 🎙 **Muet par un modo :** \`Activé\` => \`Désactivé\`\n` : ``} ${!oldState.serverDeaf && newState.serverDeaf ? `> 🔈 **Sourd par un modo :** \`Désactivé\` => \`Activé\`\n` : ``} ${oldState.serverDeaf && !newState.serverDeaf ? `> 🔈 **Sourd par un modo :** \`Activé\` => \`Désactivé\`\n` : ``} ${!oldState.selfVideo && newState.selfVideo ? `> 📷 **Camera :** \`Désactivé\` => \`Activé\`\n` : ``} ${oldState.selfVideo && !newState.selfVideo ? `> 📷 **Camera :** \`Activé\` => \`Désactivé\`\n` : ``} ${!oldState.streaming && newState.streaming ? `> 📺 **Partage d'écran :** \`Désactivé\` => \`Activé\`\n` : ``} ${oldState.streaming && !newState.streaming ? `> 📺 **Partage d'écran :** \`Activé\` => \`Désactivé\`\n` : ``} ${!oldState.suppress && newState.suppress ? `> 📣 **Muet dans Stage :** \`Désactivé\` => \`Activé\`\n` : ``} ${oldState.suppress && !newState.suppress ? `> 📣 **Muet dans Stage :** \`Activé\` => \`Désactivé\`\n` : ``}
                `)
                .setTimestamp()
                .setFooter({ text: oldState.guild.name, iconURL: oldState.guild.iconURL() })

            logChannel.send({ embeds: [embedDeaf] });
        }}


        /*
         * Auto-Vocals
         */
        const oldChannel = oldState.channel;
        const newChannel = newState.channel;
        let old_vocal = null;
        let new_vocal = null;
        if (oldChannel) old_vocal = await Vocals.findOne({ where: { voice_id: oldChannel.id } });
        if (newChannel) new_vocal = await Vocals.findOne({ where: { voice_id: newChannel.id } });

        // If the new channel is a auto-vocal
        if (new_vocal) {
            await newChannel.clone({
                name: `${newState.member.user.username}`,
            }).then(async (channel) => {
                // Move the user to the new channel
                await newState.setChannel(channel);

                // Overwrite the permissions
                await channel.permissionOverwrites.edit(newState.member.id, {
                    ViewChannel: true,
                    ManageChannels: true,
                    ManageRoles: true,
                    CreateInstantInvite: true,
                    Connect: true,
                    PrioritySpeaker: true,
                });
            });

        }

        // If the old channel is empty and it's not a auto-vocal, delete it
        if (oldChannel) {
            if (!newChannel || oldChannel.id !== newChannel.id) {
                
                // If the channel category has a auto-vocal
                const category = oldChannel.parent;
                if (category) {
                    const category_vocals = await Vocals.findAll({ where: { category_id: category.id } });
                    if (category_vocals.length > 0) {

                        // If the channel are not ignore by the auto-vocal
                        let ignore = false;
                        for (const vocal of category_vocals) {
                            const ignore_voices = vocal.ignore_voices;
                            for (const ignore_voice of ignore_voices) {
                                if (ignore_voice === oldChannel.id) ignore = true;
                            }
                            if (vocal.voice_id === oldChannel.id) ignore = true;
                        }

                        if (!ignore) {
                            // If the channel not a auto-vocal and is empty, delete it
                            if (!old_vocal && oldChannel.members.size === 0) {
                                await oldChannel.delete();
                            }
                        }
                    }
                }
            }
        }
    }
};