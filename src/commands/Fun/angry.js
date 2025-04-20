const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const angryGifDir = path.join(__dirname, '..', '..', 'gifs', 'angry');
const angryEmoji = "<a:angry:1339326652240494632>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('angry')
        .setDescription('Zeige den Leuten wie wütend du bist.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        // Lese alle GIF-Dateien im Ordner
        const gifFiles = fs.readdirSync(angryGifDir).filter(file => file.endsWith('.gif'));

        if (gifFiles.length === 0) {
            return interaction.reply('Keine angry GIFs gefunden!');
        }

        // Wähle zufällig eines aus
        const randomGif = gifFiles[Math.floor(Math.random() * gifFiles.length)];
        const gifPath = path.join(angryGifDir, randomGif);

        // Erstelle ein Attachment
        const attachment = new AttachmentBuilder(gifPath);

        // Erstelle das Embed
        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist wütend. ${angryEmoji}`)
            .setColor('Purple')
            .setImage(`attachment://${randomGif}`);

        await interaction.reply({ embeds: [embed], files: [attachment] });
    }
};
