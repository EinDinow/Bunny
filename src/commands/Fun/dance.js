const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');  // Verwende EmbedBuilder anstelle von MessageEmbed
const random = require('random');

// Diese GIFs sind als Beispiel, stelle sicher, dass du die richtigen URLs für deine GIFs hast
const danceGifs = [
    "https://i.imgur.com/R95Vz82.gif",
    "https://i.imgur.com/lps57Ws.gif",
    "https://i.imgur.com/xda0BZt.gif",
    "https://i.imgur.com/mLVUH12.gif",
    "https://i.imgur.com/ZCOp400.gif",
    "https://i.imgur.com/T9uIK4M.gif"
];

const danceEmoji = "<a:dance:1339326729637855242>"; // Hier das passende Emoji einfügen

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dance')
        .setDescription('Zeige den Leuten wie gut du tanzen kannst')
        .setIntegrationTypes([0, 1])  // Beispiel für deine "integration_types"
        .setContexts([0, 1, 2]),      // Beispiel für deine "contexts"

    async execute(interaction) {
        // Wähle zufällig ein GIF aus der Liste aus
        const randomIndex = Math.floor(Math.random() * danceGifs.length);
        const danceGif = danceGifs[randomIndex];

        // Erstelle das Embed für die Antwort
        const embed = new EmbedBuilder()  // Nutze EmbedBuilder hier
            .setDescription(`${interaction.user} ist am tanzen. ${danceEmoji}`)
            .setColor(0x800080)
            .setImage(danceGif);

        // Sende das Embed als Antwort
        await interaction.reply({ embeds: [embed] });
    }
};
