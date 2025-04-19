const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const random = require('random');

const patGifs = [
    "https://i.imgur.com/2HVlLtg.gif",
    "https://i.imgur.com/9e7g8l3.gif",
    "https://i.imgur.com/SNj5I4Y.gif",
    "https://i.imgur.com/lqUKytG.gif",
    "https://i.imgur.com/m2fZEjI.gif"
];

const patEmoji = "<a:pat:1339326891105980537>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pat')
        .setDescription('Du kannst generell oder jemanden bestimmtes streicheln.')
        .setIntegrationTypes([0,1])
        .setContexts([0,1,2])
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Die Person, die du beißen möchtest.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const randomIndex = Math.floor(Math.random() * patGifs.length);
        const patGif = patGifs[randomIndex];

        const user = interaction.options.getUser('user');

        if (!user) {
            const embed = {
                description: `${interaction.user} ist am streicheln. ${patEmoji}`,
                color: 0x800080,
                image: { url: patGif }
            };
            await interaction.reply({ embeds: [embed] });
        } else if (user.id === interaction.user.id) {
            const embed = {
                description: "Um zu streicheln, lasse das Argument (User) weg!",
                color: 0xFF0000
            };
            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            const embed = {
                description: `${user} du wirst von ${interaction.user} gestreichelt. ${patEmoji}`,
                color: 0x800080,
                image: { url: patGif }
            };
            await interaction.reply({ content: `${user}`, embeds: [embed] });
        }
    }
};
