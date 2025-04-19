const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');  // Verwende EmbedBuilder anstelle von MessageEmbed
const random = require('random');

// Diese GIFs sind als Beispiel, stelle sicher, dass du die richtigen URLs für deine GIFs hast
const sparkleGifs = [
"https://i.imgur.com/2Vdi1Pt.gif",
"https://i.imgur.com/ug2QFit.gif",
"https://i.imgur.com/PNzq8VA.gif",
"https://i.imgur.com/5X65m2M.gif",
"https://i.imgur.com/e8yBPFd.gif"
];

const sparkleEmoji = "<a:sparkle:1342918035211812894>"; // Hier das passende Emoji einfügen

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sparkle')
        .setDescription('Zeige den Leuten wie sehr du funkelst')
        .setIntegrationTypes([0, 1])  // Beispiel für deine "integration_types"
        .setContexts([0, 1, 2]),      // Beispiel für deine "contexts"

    async execute(interaction) {
        // Wähle zufällig ein GIF aus der Liste aus
        const randomIndex = Math.floor(Math.random() * sparkleGifs.length);
        const sparkleGif = sparkleGifs[randomIndex];

        // Erstelle das Embed für die Antwort
        const embed = new EmbedBuilder()  // Nutze EmbedBuilder hier
            .setDescription(`${interaction.user} ist am funkeln. ${sparkleEmoji}`)
            .setColor(0x800080)
            .setImage(sparkleGif);

        // Sende das Embed als Antwort
        await interaction.reply({ embeds: [embed] });
    }
};
