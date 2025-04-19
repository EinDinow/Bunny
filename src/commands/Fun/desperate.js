const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const random = require('random');

const desperateGifs = [
"https://i.imgur.com/Fer2KTx.gif",
"https://i.imgur.com/EKLPjbc.gif",
"https://i.imgur.com/XUmVkEb.gif",
"https://i.imgur.com/iOBgwNF.gif",
"https://i.imgur.com/I96r9tp.gif"
];

const desperateEmoji = "<:desperate:1345463280214478958>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('desperate')
        .setDescription('Zeige den Leuten wie verzweifelt du bist')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const randomIndex = Math.floor(Math.random() * desperateGifs.length);
        const desperateGif = desperateGifs[randomIndex];

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist verzweifelt. ${desperateEmoji}`)
            .setColor(0x800080)
            .setImage(desperateGif);

        await interaction.reply({ embeds: [embed] });
    }
};
