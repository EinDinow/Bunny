const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const random = require('random');

const hungryGifs = [
    "https://i.imgur.com/Y0kiijg.gif",
    "https://i.imgur.com/eEXKCQy.gif",
    "https://i.imgur.com/frQd8WV.gif",
    "https://i.imgur.com/17S0Kx3.gif",
    "https://i.imgur.com/qfkQ0iC.gif"
];

const hungryEmoji = "<:hungry:1363164268639424633>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hungry')
        .setDescription('Zeige den Leuten wie hungrig du bist.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const randomIndex = Math.floor(Math.random() * hungryGifs.length);
        const hungryGif = hungryGifs[randomIndex];

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist hungrig. ${hungryEmoji}`)
            .setColor('Purple')
            .setImage(hungryGif);

        await interaction.reply({ embeds: [embed] });
    }
};
