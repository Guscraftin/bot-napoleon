const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("docs")
		.setDescription("Permet d'afficher des messages informatifs.")
		.addStringOption(option =>
			option.setName('type')
				.setDescription('The input to echo back')
				.addChoices(
					{ name: 'règlement', value: 'reglement' },
				)
				.setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
	async execute(interaction) {
		const type = interaction.options.getString('type');
        
		switch (type) {
			case 'reglement':
                // Get the current date
                const now = new Date();

                // Add a zero before numbers less than 10
                function zeroPad(value) {
                    return value < 10 ? `0${value}` : value;
                }

                // Get the date to format DD/MM/AAAA HH:MM
                const day = ('0' + now.getDate()).slice(-2);
                const month = ('0' + (now.getMonth() + 1)).slice(-2);
                const year = now.getFullYear();
                const formattedDate = `${day}/${month}/${year}`;
                const hours = zeroPad(now.getHours());
                const minutes = zeroPad(now.getMinutes());

                // Create the embed message
				const embed = new EmbedBuilder()
					.setTitle('Règlement')
					.setDescription(`
                        1 · En rejoignant notre Discord, nous considérons que vous connaissez les [Conditions d'Utilisation](https://discord.com/terms) de Discord et vous devenez les appliqués.

                        2 · L'ensemble des règles n'a pas de sanction prédéfinie, tout staff est libre d'appliquer la sanction qui lui semble juste, par conséquent toute action de non respect du règlement justifie toute sanction, quel quel soit.

                        3 · Toute sanction peut être accompagner d'un signalement à l'équipe de Discord.

                        4 · Le spam / le flood / le hors sujet / la pollution / la mention abusive (plus de trois mentions) dans un quelconque Channel est punissable. 

                        5 · Toute insulte / toute injure / toute utilisation de mots injurieux est punissable (l'humour est bien sûr toléré).

                        6 · Toute insulte / toute injure / toute utilisation de mots à injurieux sur le thème raciale / politique / sexuelle / ou toute autre discrimination est punissable. 

                        7 · Toute PUB en message privée ou sur le discord, sans le consentement du ou des membres concernés est punissable.

                        8 · Toute PUB avec ce Discord ne respectant pas les règle d'un serveur (Pub MP / Spam Pub / Pub abusive) est punissable.

                        9 · Toute utilisation d'un double-compte sans autorisation de la Direction est punissable.

                        10 · Toute divulgation de Dossier / Contenue / Conversation / Information / et autre, venant de la partie interne (staff et direction) est punissable.

                        11 · Ce règlement est applicable tant bien sur l'ensemble des Discord de la communauté, mais aussi sur toute autre plateforme de discussion concernant la communauté, ainsi que tout message privée avec un membre de notre discord ou toute autre plateforme.

                        12 · Tout pseudo modifié sur le Discord ou les autres plateformes, doit rester respectueux, les pseudos humoristiques et provisoires sont, bien sûr, tolérés.

                        13 · Toute arnaque / tout vol / tout leak est punissable.

                        14 · Toute soudboard / tout spam / toute utilisation ou production d'un sons de plus de 80 décibels (seuil de dangerosité sonore) en vocal est punissable.

                        15 · Tout post de contenu vulgaire, à caractère sexuel, haineux, raciste ou violent est punissable.
                    
                        **Dès votre arriver sur le Discord, nous considérons que vous avez connaissances des Condition d'Utilisation de Discord ainsi que de notre règlement spécifique. Vous pouvez-donc être sanctionner en toute connaissance de cause.**
                    `)
					.setColor('00ad7a')
                    .setFooter({ text: `Dernière modification: ${formattedDate} à ${hours}h${minutes}` });

                await interaction.channel.send({ embeds: [embed] });
                break;

			default:
				return interaction.reply({ content: 'Je ne trouve pas ce que tu cherches.', ephemeral: true });
		}

        return interaction.reply({ content: 'Le message a bien été envoyé dans ce salon.', ephemeral: true });
	},
};