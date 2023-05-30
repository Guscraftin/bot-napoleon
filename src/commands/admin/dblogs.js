const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { Logs } = require('../../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("dblogs")
		.setDescription("🔧 Permet de configurer la db des logs.")
        .addChannelOption(option => 
            option.setName('logs_moderation')
            .setDescription('Le channel où seront envoyés les logs concernant les actions de modération.'))
        .addChannelOption(option => 
            option.setName('logs_members')
            .setDescription('Le channel où seront envoyés les logs concernant les membres.'))
        .addChannelOption(option => 
            option.setName('logs_messages')
            .setDescription('Le channel où seront envoyés les logs les messages.'))
        .addChannelOption(option => 
            option.setName('logs_channels')
            .setDescription('Le channel où seront envoyés les logs des salons.'))
        .addChannelOption(option => 
            option.setName('logs_generals')
            .setDescription('Le channel où seront envoyés les autres logs.'))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
	async execute(interaction) {
        const logs_moderation = interaction.options.getChannel('logs_moderation');
        const logs_members = interaction.options.getChannel('logs_members');
        const logs_messages = interaction.options.getChannel('logs_messages');
        const logs_channels = interaction.options.getChannel('logs_channels');
        const logs_generals = interaction.options.getChannel('logs_generals');

        try {
            if (logs_moderation) {
                await Logs.update({ logs_moderation: logs_moderation.id }, { where: { guild_id: interaction.guildId } });
            }
            if (logs_members) {
                await Logs.update({ logs_members: logs_members.id }, { where: { guild_id: interaction.guildId } });
            } 
            if (logs_messages) {
                await Logs.update({ logs_messages: logs_messages.id }, { where: { guild_id: interaction.guildId } });
            }
            if (logs_channels) {
                await Logs.update({ logs_channels: logs_channels.id }, { where: { guild_id: interaction.guildId } });
            }
            if (logs_generals) {
                await Logs.update({ logs_generals: logs_generals.id }, { where: { guild_id: interaction.guildId } });
            }

            return interaction.reply({ content: "La db a correctement été modifiée.", ephemeral: true });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "Une erreur est survenue lors de la modification de la db.", ephemeral: true });
        }
	},
};