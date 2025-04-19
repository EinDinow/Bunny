const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const random = require('random');

const blushGifs = [
    "https://i.imgur.com/oPVBCxb.gif",
    "https://i.imgur.com/3X7v4ox.gif",
    "https://i.imgur.com/IbMqtJa.gif",
    "https://i.imgur.com/OgNEwTX.gif",
    "https://i.imgur.com/5wwihFU.gif"
];

const blushEmoji = "<a:blush:1339326689678852147>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blush')
        .setDescription('Zeige den Leuten wie errötet du bist')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const randomIndex = Math.floor(Math.random() * blushGifs.length);
        const blushGif = blushGifs[randomIndex];

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist errötet. ${blushEmoji}`)
            .setColor(0x800080)
            .setImage(blushGif);

        await interaction.reply({ embeds: [embed] });
    }
};
