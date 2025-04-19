const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');  // Verwende EmbedBuilder anstelle von MessageEmbed
const random = require('random');

// Diese GIFs sind als Beispiel, stelle sicher, dass du die richtigen URLs für deine GIFs hast
const boredGifs = [
"https://i.imgur.com/lkLGeoU.gif",
"https://i.imgur.com/wOpCJyj.gif",
"https://i.imgur.com/DAfOHjq.gif",
"https://i.imgur.com/RJIe1HE.gif",
"https://i.imgur.com/LIyk0Uj.gif"
];

const boredEmoji = "<a:bored:1340049895939113063>"; // Hier das passende Emoji einfügen

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bored')
        .setDescription('Zeige den Leuten wie gelangweilt du bist')
        .setIntegrationTypes([0, 1])  // Beispiel für deine "integration_types"
        .setContexts([0, 1, 2]),      // Beispiel für deine "contexts"

    async execute(interaction) {
        // Wähle zufällig ein GIF aus der Liste aus
        const randomIndex = Math.floor(Math.random() * boredGifs.length);
        const boredGif = boredGifs[randomIndex];

        // Erstelle das Embed für die Antwort
        const embed = new EmbedBuilder()  // Nutze EmbedBuilder hier
            .setDescription(`${interaction.user} ist gelangweilt ${boredEmoji}`)
            .setColor(0x800080)
            .setImage(boredGif);

        // Sende das Embed als Antwort
        await interaction.reply({ embeds: [embed] });
    }
};
