const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');  // Verwende EmbedBuilder anstelle von MessageEmbed
const random = require('random');

// Diese GIFs sind als Beispiel, stelle sicher, dass du die richtigen URLs für deine GIFs hast
const happyGifs = [
    "https://i.imgur.com/f8wsRXY.gif",
    "https://i.imgur.com/CwEmD6v.gif",
    "https://i.imgur.com/OvRLy2F.gif",
    "https://i.imgur.com/jyHB2oF.gif",
    "https://i.imgur.com/ARp2pbj.gif"
];

const happyEmoji = "<a:happy:1339326745169498247>"; // Hier das passende Emoji einfügen

module.exports = {
    data: new SlashCommandBuilder()
        .setName('happy')
        .setDescription('Zeige den Leuten wie glücklich du bist.')
        .setIntegrationTypes([0, 1])  // Beispiel für deine "integration_types"
        .setContexts([0, 1, 2]),      // Beispiel für deine "contexts"

    async execute(interaction) {
        // Wähle zufällig ein GIF aus der Liste aus
        const randomIndex = Math.floor(Math.random() * happyGifs.length);
        const happyGif = happyGifs[randomIndex];

        // Erstelle das Embed für die Antwort
        const embed = new EmbedBuilder()  // Nutze EmbedBuilder hier
            .setDescription(`${interaction.user} ist glücklich. ${happyEmoji}`)
            .setColor(0x800080)
            .setImage(happyGif);

        // Sende das Embed als Antwort
        await interaction.reply({ embeds: [embed] });
    }
};
