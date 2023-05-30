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
            return interaction.editReply({ content: "Une erreur est survenue lors de la synchronisation des rôles.", ephemeral: true });
        } else {
            return interaction.editReply({ content: "Les rôles ont été synchronisés.", ephemeral: true });
        }
	}, syncRoles
};

async function syncRoles(client) {
    const { 
        role_fr_french, role_en_english, role_main_french, role_main_english,
        role_fr_leaders, role_en_leaders, role_main_fr_leaders, role_main_en_leaders,
        role_fr_staff, role_en_staff, role_main_staff, role_main_founders,
        role_fr_topstaff, role_en_topstaff, role_main_topstaff
    } = require('../../const.json');

    /*
     * Sync roles
     * - french and english roles
     * - french and english leader roles
     * - staff roles 
     */

    // Get guilds
    const guild_main = await client.guilds.fetch(process.env.GUILD_ID_MAIN);
    const guild_fr = await client.guilds.fetch(process.env.GUILD_ID_FR);
    const guild_en = await client.guilds.fetch(process.env.GUILD_ID_EN);

    if (guild_main instanceof Collection || guild_fr instanceof Collection || guild_en instanceof Collection) return;

    // Get roles in nations guilds
    const roles_fr = await guild_fr.roles.fetch(role_fr_french);
    const roles_en = await guild_en.roles.fetch(role_en_english);
    const roles_fr_leaders = await guild_fr.roles.fetch(role_fr_leaders);
    const roles_en_leaders = await guild_en.roles.fetch(role_en_leaders);
    const roles_fr_staff = await guild_fr.roles.fetch(role_fr_staff);
    const roles_en_staff = await guild_en.roles.fetch(role_en_staff);
    const roles_fr_topstaff = await guild_fr.roles.fetch(role_fr_topstaff);
    const roles_en_topstaff = await guild_en.roles.fetch(role_en_topstaff);

    const members_fr = roles_fr.members;
    const members_en = roles_en.members;
    const members_fr_leaders = roles_fr_leaders.members;
    const members_en_leaders = roles_en_leaders.members;
    const members_fr_staff = roles_fr_staff.members;
    const members_en_staff = roles_en_staff.members;
    const members_fr_topstaff = roles_fr_topstaff.members;
    const members_en_topstaff = roles_en_topstaff.members;

    // Get roles in main guild
    const roles_main_fr = await guild_main.roles.fetch(role_main_french);
    const roles_main_en = await guild_main.roles.fetch(role_main_english);
    const roles_main_fr_leaders = await guild_main.roles.fetch(role_main_fr_leaders);
    const roles_main_en_leaders = await guild_main.roles.fetch(role_main_en_leaders);
    const roles_main_staff = await guild_main.roles.fetch(role_main_staff);
    const roles_main_founders = await guild_main.roles.fetch(role_main_founders);
    const roles_main_topstaff = await guild_main.roles.fetch(role_main_topstaff);

    const members_main_fr = roles_main_fr.members;
    const members_main_en = roles_main_en.members;
    const members_main_fr_leaders = roles_main_fr_leaders.members;
    const members_main_en_leaders = roles_main_en_leaders.members;
    const members_main_staff = roles_main_staff.members.concat(roles_main_founders.members);
    const members_main_topstaff = roles_main_topstaff.members;


    // Sync roles
    await members_fr.forEach(async member => {
        if (!members_main_fr.has(member.id)) {
            try {
                const guildMember = await guild_main.members.fetch(member.id);
                if (guildMember) await guildMember.roles.add(role_main_french);
            } catch (error) {}
        }
    });

    await members_en.forEach(async member => {
        if (!members_main_en.has(member.id)) {
            try {
                const guildMember = await guild_main.members.fetch(member.id);
                if (guildMember) await guildMember.roles.add(role_main_english);
            } catch (error) {}
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

    await members_fr_leaders.forEach(async member => {
        if (!members_main_fr_leaders.has(member.id)) {
            try {
                const guildMember = await guild_main.members.fetch(member.id);
                if (guildMember) await guildMember.roles.add(role_main_fr_leaders);
            } catch (error) {}
        }
    });

    await members_en_leaders.forEach(async member => {
        if (!members_main_en_leaders.has(member.id)) {
            try {
                const guildMember = await guild_main.members.fetch(member.id);
                if (guildMember) await guildMember.roles.add(role_main_en_leaders);
            } catch (error) {}
        }
    });

    await members_main_fr_leaders.forEach(async member => {
        if (!members_fr_leaders.has(member.id)) {
            await member.roles.remove(role_main_fr_leaders);
        }
    });

    await members_main_en_leaders.forEach(async member => {
        if (!members_en_leaders.has(member.id)) {
            await member.roles.remove(role_main_en_leaders);
        }
    });

    await members_main_staff.forEach(async member => {
        if (!members_fr_staff.has(member.id)) {
            try {
                const guildMember = await guild_fr.members.fetch(member.id);
                if (guildMember) await guildMember.roles.add(role_fr_staff);
            } catch (error) {}
        }
    });

    await members_main_staff.forEach(async member => {
        if (!members_en_staff.has(member.id)) {
            try {
                const guildMember = await guild_en.members.fetch(member.id);
                if (guildMember) await guildMember.roles.add(role_en_staff);
            } catch (error) {}
        }
    });

    await members_fr_staff.forEach(async member => {
        if (!members_main_staff.has(member.id)) {
            await member.roles.remove(role_fr_staff);
        }
    });

    await members_en_staff.forEach(async member => {
        if (!members_main_staff.has(member.id)) {
            await member.roles.remove(role_en_staff);
        }
    });

    await members_main_topstaff.forEach(async member => {
        if (!members_fr_topstaff.has(member.id)) {
            try {
                const guildMember = await guild_fr.members.fetch(member.id);
                if (guildMember) await guildMember.roles.add(role_fr_topstaff);
            } catch (error) {}
        }
    });

    await members_main_topstaff.forEach(async member => {
        if (!members_en_topstaff.has(member.id)) {
            try {
                const guildMember = await guild_en.members.fetch(member.id);
                if (guildMember) await guildMember.roles.add(role_en_topstaff);
            } catch (error) {}
        }
    });

    await members_fr_topstaff.forEach(async member => {
        if (!members_main_topstaff.has(member.id)) {
            await member.roles.remove(role_fr_topstaff);
        }
    });

    await members_en_topstaff.forEach(async member => {
        if (!members_main_topstaff.has(member.id)) {
            await member.roles.remove(role_en_topstaff);
        }
    });

    return true;
}