const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');  // Verwende EmbedBuilder anstelle von MessageEmbed
const random = require('random');

// Diese GIFs sind als Beispiel, stelle sicher, dass du die richtigen URLs für deine GIFs hast
const biteGifs = [
    "https://i.imgur.com/gAXWS9L.gif",
    "https://i.imgur.com/Rmer7R5.gif",
    "https://i.imgur.com/BQ15TkA.gif",
    "https://i.imgur.com/IDe1ioi.gif",
    "https://i.imgur.com/8VINyS9.gif"
];

const biteEmoji = "<a:bite:1339326674210258985>"; // Hier das passende Emoji einfügen

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bite')
        .setDescription('Du kannst generell oder jemanden bestimmtes beißen.')
        .setIntegrationTypes([0,1])
        .setContexts([0,1,2])
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Die Person, die du beißen möchtest.')
                .setRequired(false)
        ),

    async execute(interaction) {
        // Wähle zufällig ein GIF aus der Liste aus
        const randomIndex = Math.floor(Math.random() * biteGifs.length);
        const biteGif = biteGifs[randomIndex];

        // Den Benutzer aus der Interaction-Option extrahieren
        const user = interaction.options.getUser('user');

        // Erstelle das Embed für die Antwort
        if (!user) {
            // Embed für Selbstbeißen
            const embed = {
                description: `${interaction.user} ist am beißen. ${biteEmoji}`,
                color: 0x800080,
                image: { url: biteGif }
            };
            await interaction.reply({ embeds: [embed] });
        } else if (user.id === interaction.user.id) {
            // Fehlermeldung, wenn sich der Nutzer selbst auswählt
            const embed = {
                description: "Um zu beißen, lasse das Argument (User) weg!",
                color: 0xFF0000
            };
            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            // Embed für das Beißen eines anderen Nutzers
            const embed = {
                description: `${user} du wirst von ${interaction.user} gebissen. ${biteEmoji}`,
                color: 0x800080,
                image: { url: biteGif }
            };
            await interaction.reply({ content: `${user}`, embeds: [embed] });
        }
    }
};
