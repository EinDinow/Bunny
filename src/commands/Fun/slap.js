const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const random = require('random');

const slapGifs = [
    "https://i.imgur.com/TaUdUvq.gif",
    "https://i.imgur.com/DzH9n70.gif",
    "https://i.imgur.com/qqLtEVl.gif",
    "https://i.imgur.com/xm6mMYx.gif",
    "https://i.imgur.com/pJRmjmR.gif"
];

const slapEmoji = "<:slap:1339326910962073612>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Du kannst generell oder jemanden bestimmtes streicheln.')
        .setIntegrationTypes([0,1])
        .setContexts([0,1,2])
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Die Person, die du beißen möchtest.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const randomIndex = Math.floor(Math.random() * slapGifs.length);
        const slapGif = slapGifs[randomIndex];

        const user = interaction.options.getUser('user');

        if (!user) {
            const embed = {
                description: `${interaction.user} ist am schlagen. ${slapEmoji}`,
                color: 0x800080,
                image: { url: slapGif }
            };
            await interaction.reply({ embeds: [embed] });
        } else if (user.id === interaction.user.id) {
            const embed = {
                description: "Um zu schlagen, lasse das Argument (User) weg!",
                color: 0xFF0000
            };
            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            const embed = {
                description: `${user} du wirst von ${interaction.user} geschlagen. ${slapEmoji}`,
                color: 0x800080,
                image: { url: slapGif }
            };
            await interaction.reply({ content: `${user}`, embeds: [embed] });
        }
    }
};
