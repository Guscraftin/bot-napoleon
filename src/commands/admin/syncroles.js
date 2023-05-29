const { Collection, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("syncroles")
		.setDescription("Permet de vérifier la syncronisation des rôles entre les serveurs discord.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
	async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
    
        // Sync roles
        if (!await syncRoles(interaction.client)) {
            return await interaction.editReply({ content: "Une erreur est survenue lors de la synchronisation des rôles.", ephemeral: true });
        } else {
            await interaction.editReply({ content: "Les rôles ont été synchronisés.", ephemeral: true });
        }
	}, syncRoles
};

async function syncRoles(client) {
    const { role_fr_french, role_en_english, role_main_french, role_main_english } = require('../../const.json');

    // Get guilds
    const guild_main = await client.guilds.fetch(process.env.GUILD_ID_MAIN);
    const guild_fr = await client.guilds.fetch(process.env.GUILD_ID_FR);
    const guild_en = await client.guilds.fetch(process.env.GUILD_ID_EN);

    if (guild_main instanceof Collection || guild_fr instanceof Collection || guild_en instanceof Collection) return;

    // Get roles in nations guilds
    const roles_fr = await guild_fr.roles.fetch(role_fr_french);
    const roles_en = await guild_en.roles.fetch(role_en_english);

    const members_fr = roles_fr.members;
    const members_en = roles_en.members;

    // Get roles in main guild
    const roles_main_fr = await guild_main.roles.fetch(role_main_french);
    const roles_main_en = await guild_main.roles.fetch(role_main_english);

    const members_main_fr = roles_main_fr.members;
    const members_main_en = roles_main_en.members;

    // Sync roles
    await members_fr.forEach(async member => {
        if (!members_main_fr.has(member.id)) {
            const guildMember = await guild_main.members.fetch(member.id);
            await guildMember.roles.add(role_main_french);
        }
    });

    await members_en.forEach(async member => {
        if (!members_main_en.has(member.id)) {
            const guildMember = await guild_main.members.fetch(member.id);
            await guildMember.roles.add(role_main_english);
        }
    });

    await members_main_fr.forEach(async member => {
        if (!members_fr.has(member.id)) {
            await member.roles.remove(role_main_french);
        }
    });

    await members_main_en.forEach(async member => {
        if (!members_en.has(member.id)) {
            await member.roles.remove(role_main_english);
        }
    });

    return true;
}