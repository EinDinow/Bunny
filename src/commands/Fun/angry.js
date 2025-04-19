const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const random = require('random');

const angryGifs = [
    "https://i.imgur.com/jd69a6l.gif",
    "https://i.imgur.com/AVJHmIz.gif",
    "https://i.imgur.com/JyWmybA.gif",
    "https://i.imgur.com/iLRfSsE.gif",
    "https://i.imgur.com/gknFNeX.gif"
];

const angryEmoji = "<a:angry:1339326652240494632>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('angry')
        .setDescription('Zeige den Leuten wie wütend du bist.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const randomIndex = Math.floor(Math.random() * angryGifs.length);
        const angryGif = angryGifs[randomIndex];

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist wütend. ${angryEmoji}`)
            .setColor('Purple')
            .setImage(angryGif);

        await interaction.reply({ embeds: [embed] });
    }
};
