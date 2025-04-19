const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const random = require('random');

const cryGifs = [
    "https://i.imgur.com/698DyZp.gif",
    "https://i.imgur.com/AcFSdS0.gif",
    "https://i.imgur.com/1nHEn1u.gif",
    "https://i.imgur.com/1ZLMMbU.gif",
    "https://i.imgur.com/7EthHex.gif"
];

const cryEmoji = "<:cry:1339326711354888253>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cry')
        .setDescription('Zeige den Leuten wie sehr du weinen must.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const randomIndex = Math.floor(Math.random() * cryGifs.length);
        const cryGif = cryGifs[randomIndex];

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist am weinen. ${cryEmoji}`)
            .setColor(0x800080)
            .setImage(cryGif);

        await interaction.reply({ embeds: [embed] });
    }
};