const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');  // Verwende EmbedBuilder anstelle von MessageEmbed
const random = require('random');

// Diese GIFs sind als Beispiel, stelle sicher, dass du die richtigen URLs für deine GIFs hast
const blushGifs = [
    "https://i.imgur.com/oPVBCxb.gif",
    "https://i.imgur.com/3X7v4ox.gif",
    "https://i.imgur.com/IbMqtJa.gif",
    "https://i.imgur.com/OgNEwTX.gif",
    "https://i.imgur.com/5wwihFU.gif"
];

const blushEmoji = "<a:blush:1339326689678852147>"; // Hier das passende Emoji einfügen

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blush')
        .setDescription('Zeige den Leuten wie errötet du bist')
        .setIntegrationTypes([0, 1])  // Beispiel für deine "integration_types"
        .setContexts([0, 1, 2]),      // Beispiel für deine "contexts"

    async execute(interaction) {
        // Wähle zufällig ein GIF aus der Liste aus
        const randomIndex = Math.floor(Math.random() * blushGifs.length);
        const blushGif = blushGifs[randomIndex];

        // Erstelle das Embed für die Antwort
        const embed = new EmbedBuilder()  // Nutze EmbedBuilder hier
            .setDescription(`${interaction.user} ist errötet. ${blushEmoji}`)
            .setColor(0x800080)
            .setImage(blushGif);

        // Sende das Embed als Antwort
        await interaction.reply({ embeds: [embed] });
    }
};
