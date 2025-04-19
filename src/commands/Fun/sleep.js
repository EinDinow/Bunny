const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const random = require('random');

const sleepGifs = [
    "https://i.imgur.com/7D29JJ8.gif",
    "https://i.imgur.com/l8y17aA.gif",
    "https://i.imgur.com/kjKVCyk.gif",
    "https://i.imgur.com/omHvavY.gif",
    "https://i.imgur.com/3ol4sNX.gif"
];

const sleepEmoji = "<a:sleep:1339712344129011755>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sleep')
        .setDescription('Zeige den Leuten das du am schlafen bist.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const randomIndex = Math.floor(Math.random() * sleepGifs.length);
        const sleepGif = sleepGifs[randomIndex];

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist am schlafen. ${sleepEmoji}`)
            .setColor(0x800080)
            .setImage(sleepGif);

        await interaction.reply({ embeds: [embed] });
    }
};
