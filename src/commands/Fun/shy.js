const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const random = require('random');

const shyGifs = [
"https://i.imgur.com/D8lhBwi.gif",
"https://i.imgur.com/9lhpqPp.gif",
"https://i.imgur.com/ORjOUll.gif",
"https://i.imgur.com/3HM3nSP.gif",
"https://i.imgur.com/qcWxb1z.gif"
];

const shyEmoji = "<a:shy:1340040688917811220>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shy')
        .setDescription('Zeige den Leuten wie schüchtern du bist')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const randomIndex = Math.floor(Math.random() * shyGifs.length);
        const shyGif = shyGifs[randomIndex];

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist schüchtern. ${shyEmoji}`)
            .setColor(0x800080)
            .setImage(shyGif);

        await interaction.reply({ embeds: [embed] });
    }
};
