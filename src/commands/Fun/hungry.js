const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');  // Verwende EmbedBuilder anstelle von MessageEmbed
const random = require('random');

// Diese GIFs sind als Beispiel, stelle sicher, dass du die richtigen URLs für deine GIFs hast
const hungryGifs = [
    "https://i.imgur.com/Y0kiijg.gif",
    "https://i.imgur.com/eEXKCQy.gif",
    "https://i.imgur.com/frQd8WV.gif",
    "https://i.imgur.com/17S0Kx3.gif",
    "https://i.imgur.com/qfkQ0iC.gif"
];

const hungryEmoji = "<:hungry:1363164268639424633>"; // Hier das passende Emoji einfügen

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hungry')
        .setDescription('Zeige den Leuten wie hungrig du bist.')
        .setIntegrationTypes([0, 1])  // Beispiel für deine "integration_types"
        .setContexts([0, 1, 2]),      // Beispiel für deine "contexts"

    async execute(interaction) {
        // Wähle zufällig ein GIF aus der Liste aus
        const randomIndex = Math.floor(Math.random() * hungryGifs.length);
        const hungryGif = hungryGifs[randomIndex];

        // Erstelle das Embed für die Antwort
        const embed = new EmbedBuilder()  // Nutze EmbedBuilder hier
            .setDescription(`${interaction.user} ist hungrig. ${hungryEmoji}`)
            .setColor('Purple')
            .setImage(hungryGif);

        // Sende das Embed als Antwort
        await interaction.reply({ embeds: [embed] });
    }
};
