const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');  // Verwende EmbedBuilder anstelle von MessageEmbed
const random = require('random');

// Diese GIFs sind als Beispiel, stelle sicher, dass du die richtigen URLs für deine GIFs hast
const cryGifs = [
    "https://i.imgur.com/698DyZp.gif",
    "https://i.imgur.com/AcFSdS0.gif",
    "https://i.imgur.com/1nHEn1u.gif",
    "https://i.imgur.com/1ZLMMbU.gif",
    "https://i.imgur.com/7EthHex.gif"
];

const cryEmoji = "<:cry:1339326711354888253>"; // Hier das passende Emoji einfügen

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cry')
        .setDescription('Zeige den Leuten wie sehr du weinen must.')
        .setIntegrationTypes([0, 1])  // Beispiel für deine "integration_types"
        .setContexts([0, 1, 2]),      // Beispiel für deine "contexts"

    async execute(interaction) {
        // Wähle zufällig ein GIF aus der Liste aus
        const randomIndex = Math.floor(Math.random() * cryGifs.length);
        const cryGif = cryGifs[randomIndex];

        // Erstelle das Embed für die Antwort
        const embed = new EmbedBuilder()  // Nutze EmbedBuilder hier
            .setDescription(`${interaction.user} ist am weinen. ${cryEmoji}`)
            .setColor(0x800080)
            .setImage(cryGif);

        // Sende das Embed als Antwort
        await interaction.reply({ embeds: [embed] });
    }
};