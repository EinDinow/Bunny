const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const random = require('random');

const hugGifs = [
    "https://i.imgur.com/0HXqa8s.gif",
    "https://i.imgur.com/76wBr6V.gif",
    "https://i.imgur.com/4SkNxqO.gif",
    "https://i.imgur.com/K3Izoev.gif",
    "https://i.imgur.com/ewNz7nx.gif"
];

const hugEmoji = "<:hug:1339326763037102101>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hug')
        .setDescription('Du kannst generell oder jemanden bestimmtes umarmen.')
        .setIntegrationTypes([0,1])
        .setContexts([0,1,2])
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Die Person, die du beißen möchtest.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const randomIndex = Math.floor(Math.random() * hugGifs.length);
        const hugGif = hugGifs[randomIndex];

        const user = interaction.options.getUser('user');

        if (!user) {
            const embed = {
                description: `${interaction.user} ist am umarmen. ${hugEmoji}`,
                color: 0x800080,
                image: { url: hugGif }
            };
            await interaction.reply({ embeds: [embed] });
        } else if (user.id === interaction.user.id) {
            const embed = {
                description: "Um zu umarmen, lasse das Argument (User) weg!",
                color: 0xFF0000
            };
            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            const embed = {
                description: `${user} du wirst von ${interaction.user} umarmt. ${hugEmoji}`,
                color: 0x800080,
                image: { url: hugGif }
            };
            await interaction.reply({ content: `${user}`, embeds: [embed] });
        }
    }
};
