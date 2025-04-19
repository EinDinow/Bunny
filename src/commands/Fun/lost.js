const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');  // Verwende EmbedBuilder anstelle von MessageEmbed
const random = require('random');

// Diese GIFs sind als Beispiel, stelle sicher, dass du die richtigen URLs für deine GIFs hast
const lostGifs = [
"https://i.imgur.com/QZ34aRv.gif",
"https://i.imgur.com/r43RyqC.gif",
"https://i.imgur.com/QnfP5h0.gif",
"https://i.imgur.com/8f3uTpQ.gif",
"https://i.imgur.com/BNM7s8Z.gif"
];

const lostEmoji = "<:lost:1340046179685367868>"; // Hier das passende Emoji einfügen

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lost')
        .setDescription('Zeige den Leuten wie lost du bist')
        .setIntegrationTypes([0, 1])  // Beispiel für deine "integration_types"
        .setContexts([0, 1, 2])     // Beispiel für deine "contexts"
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Die Person, die du beißen möchtest.')
                .setRequired(false)
        ),

    async execute(interaction) {
        // Wähle zufällig ein GIF aus der Liste aus
        const randomIndex = Math.floor(Math.random() * lostGifs.length);
        const lostGif = lostGifs[randomIndex];

        const user = interaction.options.getUser('user');

        // Erstelle das Embed für die Antwort
        if (!user) {
            // Embed für Selbstbeißen
            const embed = {
                description: `${interaction.user} ist lost. ${lostEmoji}`,
                color: 0x800080,
                image: { url: lostGif }
            };
            await interaction.reply({ embeds: [embed] });
        } else if (user.id === interaction.user.id) {
            // Fehlermeldung, wenn sich der Nutzer selbst auswählt
            const embed = {
                description: "Um zu zeigen wie lost du bist, lasse das Argument (User) weg!",
                color: 0xFF0000
            };
            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            // Embed für das Beißen eines anderen Nutzers
            const embed = {
                description: `${user} ist lost. ${lostEmoji}`,
                color: 0x800080,
                image: { url: lostGif },
                footer: {
                    text: `Command ausgeführt von ${interaction.user.displayName}`,
                    icon_url: interaction.user.displayAvatarURL(),
                }
            };
            await interaction.reply({ content: `${user}`, embeds: [embed] });
        }
    }
};
