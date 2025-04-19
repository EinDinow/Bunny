const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const random = require('random');

const loveGifs = [
    "https://i.imgur.com/EVcQfw8.gif",
    "https://i.imgur.com/SLkpZK7.gif",
    "https://i.imgur.com/88C2MVH.gif",
    "https://i.imgur.com/OBxTKES.gif",
    "https://i.imgur.com/E8clJv7.gif"
];

const loveEmoji = "<:love:1339326840191451146>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('love')
        .setDescription('Du kannst generell oder jemanden bestimmtes lieben.')
        .setIntegrationTypes([0,1])
        .setContexts([0,1,2])
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Die Person, die du beißen möchtest.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const randomIndex = Math.floor(Math.random() * loveGifs.length);
        const loveGif = loveGifs[randomIndex];

        const user = interaction.options.getUser('user');

        if (!user) {
            const embed = {
                description: `${interaction.user} ist verliebt ${loveEmoji}`,
                color: 0x800080,
                image: { url: loveGif }
            };
            await interaction.reply({ embeds: [embed] });
        } else if (user.id === interaction.user.id) {
            const embed = {
                description: "Um verliebt zu sein, lasse das Argument (User) weg!",
                color: 0xFF0000
            };
            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            const embed = {
                description: `${user} du wirst von ${interaction.user} geliebt. ${loveEmoji}`,
                color: 0x800080,
                image: { url: loveGif }
            };
            await interaction.reply({ content: `${user}`, embeds: [embed] });
        }
    }
};
