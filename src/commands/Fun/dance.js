const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const random = require('random');

const danceGifs = [
    "https://i.imgur.com/R95Vz82.gif",
    "https://i.imgur.com/lps57Ws.gif",
    "https://i.imgur.com/xda0BZt.gif",
    "https://i.imgur.com/mLVUH12.gif",
    "https://i.imgur.com/ZCOp400.gif",
    "https://i.imgur.com/T9uIK4M.gif"
];

const danceEmoji = "<a:dance:1339326729637855242>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dance')
        .setDescription('Zeige den Leuten wie gut du tanzen kannst')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const randomIndex = Math.floor(Math.random() * danceGifs.length);
        const danceGif = danceGifs[randomIndex];

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist am tanzen. ${danceEmoji}`)
            .setColor(0x800080)
            .setImage(danceGif);

        await interaction.reply({ embeds: [embed] });
    }
};
