const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const random = require('random');

const boredGifs = [
    "https://i.imgur.com/lkLGeoU.gif",
    "https://i.imgur.com/wOpCJyj.gif",
    "https://i.imgur.com/DAfOHjq.gif",
    "https://i.imgur.com/RJIe1HE.gif",
    "https://i.imgur.com/LIyk0Uj.gif"
];

const boredEmoji = "<a:bored:1340049895939113063>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bored')
        .setDescription('Zeige den Leuten wie gelangweilt du bist')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const randomIndex = Math.floor(Math.random() * boredGifs.length);
        const boredGif = boredGifs[randomIndex];

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist gelangweilt ${boredEmoji}`)
            .setColor(0x800080)
            .setImage(boredGif);

        await interaction.reply({ embeds: [embed] });
    }
};
