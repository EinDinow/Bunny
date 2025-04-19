const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');  // Verwende EmbedBuilder anstelle von MessageEmbed
const random = require('random');

// Diese GIFs sind als Beispiel, stelle sicher, dass du die richtigen URLs für deine GIFs hast
const shyGifs = [
"https://i.imgur.com/D8lhBwi.gif",
"https://i.imgur.com/9lhpqPp.gif",
"https://i.imgur.com/ORjOUll.gif",
"https://i.imgur.com/3HM3nSP.gif",
"https://i.imgur.com/qcWxb1z.gif"
];

const shyEmoji = "<a:shy:1340040688917811220>"; // Hier das passende Emoji einfügen

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shy')
        .setDescription('Zeige den Leuten wie schüchtern du bist')
        .setIntegrationTypes([0, 1])  // Beispiel für deine "integration_types"
        .setContexts([0, 1, 2]),      // Beispiel für deine "contexts"

    async execute(interaction) {
        // Wähle zufällig ein GIF aus der Liste aus
        const randomIndex = Math.floor(Math.random() * shyGifs.length);
        const shyGif = shyGifs[randomIndex];

        // Erstelle das Embed für die Antwort
        const embed = new EmbedBuilder()  // Nutze EmbedBuilder hier
            .setDescription(`${interaction.user} ist schüchtern. ${shyEmoji}`)
            .setColor(0x800080)
            .setImage(shyGif);

        // Sende das Embed als Antwort
        await interaction.reply({ embeds: [embed] });
    }
};
