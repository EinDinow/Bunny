const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');  // Verwende EmbedBuilder anstelle von MessageEmbed
const random = require('random');

// Diese GIFs sind als Beispiel, stelle sicher, dass du die richtigen URLs für deine GIFs hast
const yeetGifs = [
    "https://i.imgur.com/m2qzxai.gif",
    "https://i.imgur.com/I750YEo.gif",
    "https://i.imgur.com/TUqsydv.gif",
    "https://i.imgur.com/Fde5pWE.gif",
    "https://i.imgur.com/qOn4GJs.gif",
    "https://imgur.com/a/orSXGO8"
];

const yeetEmoji = "<a:yeet:1342524033547239495>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yeet')
        .setDescription('Du kannst generell oder jemanden bestimmtes geyeetet.')
        .setIntegrationTypes([0,1])
        .setContexts([0,1,2])
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Die Person, die du beißen möchtest.')
                .setRequired(false)
        ),

    async execute(interaction) {
        // Wähle zufällig ein GIF aus der Liste aus
        const randomIndex = Math.floor(Math.random() * yeetGifs.length);
        const yeetGif = yeetGifs[randomIndex];

        // Den Benutzer aus der Interaction-Option extrahieren
        const user = interaction.options.getUser('user');

        // Erstelle das Embed für die Antwort
        if (!user) {
            // Embed für Selbstbeißen
            const embed = {
                description: `${interaction.user} ist am yeeten. ${yeetEmoji}`,
                color: 0x800080,
                image: { url: yeetGif }
            };
            await interaction.reply({ embeds: [embed] });
        } else if (user.id === interaction.user.id) {
            // Fehlermeldung, wenn sich der Nutzer selbst auswählt
            const embed = {
                description: "Um zu yeeten, lasse das Argument (User) weg!",
                color: 0xFF0000
            };
            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            // Embed für das Beißen eines anderen Nutzers
            const embed = {
                description: `${user} du wirst von ${interaction.user} geyeetet. ${yeetEmoji}`,
                color: 0x800080,
                image: { url: yeetGif }
            };
            await interaction.reply({ content: `${user}`, embeds: [embed] });
        }
    }
};
