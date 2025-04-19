const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const random = require('random');

const happyGifs = [
    "https://i.imgur.com/f8wsRXY.gif",
    "https://i.imgur.com/CwEmD6v.gif",
    "https://i.imgur.com/OvRLy2F.gif",
    "https://i.imgur.com/jyHB2oF.gif",
    "https://i.imgur.com/ARp2pbj.gif"
];

const happyEmoji = "<a:happy:1339326745169498247>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('happy')
        .setDescription('Zeige den Leuten wie glücklich du bist.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const randomIndex = Math.floor(Math.random() * happyGifs.length);
        const happyGif = happyGifs[randomIndex];

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist glücklich. ${happyEmoji}`)
            .setColor(0x800080)
            .setImage(happyGif);

        await interaction.reply({ embeds: [embed] });
    }
};
