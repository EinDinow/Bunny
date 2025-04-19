const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');  // Verwende EmbedBuilder anstelle von MessageEmbed
const random = require('random');

// Diese GIFs sind als Beispiel, stelle sicher, dass du die richtigen URLs für deine GIFs hast
const angryGifs = [
    "https://i.imgur.com/jd69a6l.gif",
    "https://i.imgur.com/AVJHmIz.gif",
    "https://i.imgur.com/JyWmybA.gif",
    "https://i.imgur.com/iLRfSsE.gif",
    "https://i.imgur.com/gknFNeX.gif"
];

const angryEmoji = "<a:angry:1339326652240494632>"; // Hier das passende Emoji einfügen

module.exports = {
    data: new SlashCommandBuilder()
        .setName('angry')
        .setDescription('Zeige den Leuten wie wütend du bist.')
        .setIntegrationTypes([0, 1])  // Beispiel für deine "integration_types"
        .setContexts([0, 1, 2]),      // Beispiel für deine "contexts"

    async execute(interaction) {
        // Wähle zufällig ein GIF aus der Liste aus
        const randomIndex = Math.floor(Math.random() * angryGifs.length);
        const angryGif = angryGifs[randomIndex];

        // Erstelle das Embed für die Antwort
        const embed = new EmbedBuilder()  // Nutze EmbedBuilder hier
            .setDescription(`${interaction.user} ist wütend. ${angryEmoji}`)
            .setColor('Purple')
            .setImage(angryGif);

        // Sende das Embed als Antwort
        await interaction.reply({ embeds: [embed] });
    }
};
