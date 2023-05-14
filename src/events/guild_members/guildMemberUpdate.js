const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.GuildMemberUpdate,
    async execute(oldMember, newMember){
        const logChannel = await getLogChannel(newMember.guild, 'logs_members');
        if (!logChannel) return;
        const addRoles = listAddRole();
        const removeRoles = listRemoveRole();

        const embed = new EmbedBuilder()
            .setAuthor({ name: oldMember.user.tag, iconURL: oldMember.user.displayAvatarURL() })
            .setColor('#009ECA')
            .setThumbnail(newMember.user.displayAvatarURL())
            .setDescription(`**${newMember.user} a été mis à jour.**
            ${oldMember.displayName !== newMember.displayName ? `> **Surnom :** \`${oldMember.displayName}\` => \`${newMember.displayName}\`\n` : ``}${addRoles.length !== 0 ? `> **Rôle ajouté :** ${addRoles}\n` : ``}${removeRoles.length !== 0 ? `> **Rôle supprimé :** ${removeRoles}\n` : ``}`)
            .setTimestamp()
            .setFooter({ text: newMember.guild.name, iconURL: newMember.guild.iconURL() })

        logChannel.send({ embeds: [embed] });


        function listAddRole() {
            let listNewRole = [];
            newMember.roles.cache.forEach(element => {
                listNewRole.push(element);
            });
            oldMember.roles.cache.forEach(element => {
                let indexElement = listNewRole.indexOf(element);
                if (indexElement !== -1) {
                    listNewRole.splice(indexElement, 1);
                }
            });
            return listNewRole;
        }

        function listRemoveRole() {
            let listOldRole = [];
            oldMember.roles.cache.forEach(element => {
                listOldRole.push(element);
            });
            newMember.roles.cache.forEach(element => {
                let indexElement = listOldRole.indexOf(element);
                if (indexElement !== -1) {
                    listOldRole.splice(indexElement, 1);
                }
            });
            return listOldRole;
        }
    }
};