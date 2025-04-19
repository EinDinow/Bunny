const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');  // Verwende EmbedBuilder anstelle von MessageEmbed
const random = require('random');

// Diese GIFs sind als Beispiel, stelle sicher, dass du die richtigen URLs für deine GIFs hast
const sleepGifs = [
    "https://i.imgur.com/7D29JJ8.gif",
    "https://i.imgur.com/l8y17aA.gif",
    "https://i.imgur.com/kjKVCyk.gif",
    "https://i.imgur.com/omHvavY.gif",
    "https://i.imgur.com/3ol4sNX.gif"
];

const sleepEmoji = "<a:sleep:1339712344129011755>"; // Hier das passende Emoji einfügen

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sleep')
        .setDescription('Zeige den Leuten das du am schlafen bist.')
        .setIntegrationTypes([0, 1])  // Beispiel für deine "integration_types"
        .setContexts([0, 1, 2]),      // Beispiel für deine "contexts"

    async execute(interaction) {
        // Wähle zufällig ein GIF aus der Liste aus
        const randomIndex = Math.floor(Math.random() * sleepGifs.length);
        const sleepGif = sleepGifs[randomIndex];

        // Erstelle das Embed für die Antwort
        const embed = new EmbedBuilder()  // Nutze EmbedBuilder hier
            .setDescription(`${interaction.user} ist am schlafen. ${sleepEmoji}`)
            .setColor(0x800080)
            .setImage(sleepGif);

        // Sende das Embed als Antwort
        await interaction.reply({ embeds: [embed] });
    }
};
