const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const random = require('random');

const sparkleGifs = [
"https://i.imgur.com/2Vdi1Pt.gif",
"https://i.imgur.com/ug2QFit.gif",
"https://i.imgur.com/PNzq8VA.gif",
"https://i.imgur.com/5X65m2M.gif",
"https://i.imgur.com/e8yBPFd.gif",
"https://i.imgur.com/ReaQBZJ.gif"
];

const sparkleEmoji = "<a:sparkle:1342918035211812894>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sparkle')
        .setDescription('Zeige den Leuten wie sehr du funkelst')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const randomIndex = Math.floor(Math.random() * sparkleGifs.length);
        const sparkleGif = sparkleGifs[randomIndex];

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist am funkeln. ${sparkleEmoji}`)
            .setColor(0x800080)
            .setImage(sparkleGif);

        await interaction.reply({ embeds: [embed] });
    }
};
