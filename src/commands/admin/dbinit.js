const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { Logs, sequelize } = require('../../dbObjects');

// Delete this command when all server have been initialized because it do in guildCreate event

module.exports = {
	data: new SlashCommandBuilder()
		.setName("dbinit")
		.setDescription("Permet d'initialiser la db pour ce serveur.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
	async execute(interaction) {
        const force = process.argv.includes('--force') || process.argv.includes('-f');

        sequelize.sync({ force }).then(async () => {
            const logs = [
                Logs.upsert({ guild_id: interaction.guildId }),
            ];
        
            await Promise.all(logs);
            await interaction.reply({ content: "La db a été initialisée pour ce serveur.", ephemeral: true });
        
        }).catch(console.error);
	},
};