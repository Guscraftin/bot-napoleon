const { ChannelType, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { Vocals } = require('../../dbObjects');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dbvocals")
        .setDescription("🔧 Permet de configurer la db des vocaux auto.")
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Ajoute un vocal auto.')
                .addChannelOption(option =>
                    option.setName('vocal')
                        .setDescription('Le vocal à ajouter.')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('ignore')
                        .setDescription('Les vocaux à ignorer sous la forme (id id id).')
                        .setRequired(false)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Supprime un vocal auto.')
                .addChannelOption(option =>
                    option.setName('vocal')
                        .setDescription('Le vocal à supprimer.')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Liste les vocaux auto.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('clear')
                .setDescription('Supprime tous les vocaux auto.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('update')
                .setDescription('Modifie un vocal auto.')
                .addChannelOption(option =>
                    option.setName('vocal')
                        .setDescription('Le vocal à modifier.')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('ignore')
                        .setDescription('Les vocaux à ignorer sous la forme (id id id).')
                        .setRequired(false)))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        // Get the options
        const voice = interaction.options.getChannel('vocal');
        const ignore = interaction.options.getString('ignore');
        
        let voice_id = null;
        let category_id = null;
        const guild_id = interaction.guildId;
        if (voice) {
            if (voice.type !== ChannelType.GuildVoice) return interaction.editReply({ content: "Le vocal doit être un salon vocal.", ephemeral: true });
            voice_id = voice.id;
            category_id = voice.parentId;
            if (!category_id) return interaction.editReply({ content: "Le vocal doit être dans une catégorie.", ephemeral: true });
        }

        // Prepare the ignore list
        let ignore_voices = [];
        if (ignore) {
            ignore_voices = ignore.split(' ');
        }

        if (ignore_voices.length > 0) {
            for (const ignore_voice of ignore_voices) {
                const ignore_voice_channel = await interaction.guild.channels.fetch(ignore_voice);
                if (!ignore_voice_channel) return interaction.editReply({ content: "Un des vocaux à ignorer n'existe pas.", ephemeral: true });
                if (ignore_voice_channel.type !== ChannelType.GuildVoice) return interaction.editReply({ content: "Un des vocaux à ignorer n'est pas un salon vocal.", ephemeral: true });
                if (ignore_voice_channel.parentId !== category_id) return interaction.editReply({ content: "Un des vocaux à ignorer n'est pas dans la même catégorie que le vocal.", ephemeral: true });
                if (ignore_voice_channel.id === voice_id) return interaction.editReply({ content: "Un des vocaux à ignorer est le vocal.", ephemeral: true });
            }
        }

        // Check if the vocal is already in the db
        try {
        const vocal = await Vocals.findOne({ where: { voice_id: voice_id } });

        switch (interaction.options.getSubcommand()) {
            case 'add':
                await Vocals.upsert({ voice_id, category_id, guild_id, ignore_voices });
                return interaction.editReply({ content: "Le vocal a été ajouté à la db.", ephemeral: true });
            case 'remove':
                if (vocal) {
                    await Vocals.destroy({ where: { voice_id: voice_id } });
                    return interaction.editReply({ content: "Le vocal a été supprimé de la db.", ephemeral: true });
                } else {
                    return interaction.editReply({ content: "Le vocal n'est pas dans la db.", ephemeral: true });
                }
            case 'list':
                try {
                    const vocals = await Vocals.findAll({ where: { guild_id: guild_id } });

                    if (vocals.length > 0) {
                        let vocalList = 'Liste des vocaux auto :\n';
                        for (const vocal of vocals) {
                            vocalList += `- Vocal : <#${vocal.voice_id}> (${vocal.voice_id})\n`;
                            vocalList += `  Catégorie : <#${vocal.category_id}>\n`;
                            vocalList += `  Vocaux à ignorer : ${vocal.ignore_voices.map(salon => `<#${salon}>`).join(', ')}\n\n`;
                        }
                        return interaction.editReply({ content: vocalList, ephemeral: true });
                    } else {
                        return interaction.editReply({ content: "Il n'y a aucun vocal auto enregistré.", ephemeral: true });
                    }
                } catch (error) {
                    console.error(error);
                    return interaction.editReply({ content: "Une erreur est survenue lors de la récupération de la liste des vocaux.", ephemeral: true });
                }
            case 'clear':
                await Vocals.destroy({ where: { guild_id: guild_id } });
                return interaction.editReply({ content: "La db a été vidée.", ephemeral: true });
            case 'update':
                const vocal = await Vocals.findOne({ where: { voice_id: voice_id } });
                if (!vocal) return interaction.editReply({ content: "Le vocal n'est pas dans la db.", ephemeral: true });
                await Vocals.update({ ignore_voices }, { where: { voice_id: voice_id } });
                return interaction.editReply({ content: "Le vocal a été modifié.", ephemeral: true });
            default:
                return interaction.reply({ content: "Aucune option trouvées !", ephemeral: true });
        }
        } catch (error) {
            console.error(error);
            return interaction.editReply({ content: "Une erreur est survenue lors de la récupération du vocal.", ephemeral: true });
        }
    },
};