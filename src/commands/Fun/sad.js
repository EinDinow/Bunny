const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const random = require('random');

const sadGifs = [
    "https://i.imgur.com/698DyZp.gif",
    "https://i.imgur.com/AcFSdS0.gif",
    "https://i.imgur.com/1nHEn1u.gif",
    "https://i.imgur.com/1ZLMMbU.gif",
    "https://i.imgur.com/7EthHex.gif"
];

const sadEmoji = "<:cry:1339326711354888253>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sad')
        .setDescription('Zeige den Leuten wie traurig du bist.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const randomIndex = Math.floor(Math.random() * sadGifs.length);
        const sadGif = sadGifs[randomIndex];

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist traurig. ${sadEmoji}`)
            .setColor(0x800080)
            .setImage(sadGif);

        await interaction.reply({ embeds: [embed] });
    }
};
