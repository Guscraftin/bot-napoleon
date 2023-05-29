const { Events, EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('../../functions');

module.exports = {
    name: Events.GuildMemberUpdate,
    async execute(oldMember, newMember){
        /*
         * Log
         */
        const logChannel = await getLogChannel(newMember.guild, 'logs_members');
        if (logChannel) {
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
        }}


        /* 
         * Sync roles (french / english)
         */
        const { role_fr_french, role_en_english, role_main_french, role_main_english } = require('../../const.json');
        const guild_main = await newMember.client.guilds.fetch(process.env.GUILD_ID_MAIN);
        const member_main = await guild_main.members.fetch(newMember.id);

        if (newMember.guild.id === process.env.GUILD_ID_FR) {
            if (!oldMember.roles.cache.has(role_fr_french) && newMember.roles.cache.has(role_fr_french)) {
                await member_main.roles.add(role_main_french);
            } else if (oldMember.roles.cache.has(role_fr_french) && !newMember.roles.cache.has(role_fr_french)) {
                await member_main.roles.remove(role_main_french);
            }
        } else if (newMember.guild.id === process.env.GUILD_ID_EN) {
            if (!oldMember.roles.cache.has(role_en_english) && newMember.roles.cache.has(role_en_english)) {
                await member_main.roles.add(role_main_english);
            } else if (oldMember.roles.cache.has(role_en_english) && !newMember.roles.cache.has(role_en_english)) {
                await member_main.roles.remove(role_main_english);
            }
        }
    }
};