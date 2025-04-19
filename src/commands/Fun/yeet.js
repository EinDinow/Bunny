const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const random = require('random');

const yeetGifs = [
    "https://i.imgur.com/m2qzxai.gif",
    "https://i.imgur.com/I750YEo.gif",
    "https://i.imgur.com/TUqsydv.gif",
    "https://i.imgur.com/Fde5pWE.gif",
    "https://i.imgur.com/qOn4GJs.gif"
];

const yeetEmoji = "<a:yeet:1342524033547239495>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yeet')
        .setDescription('Du kannst generell oder jemanden bestimmtes geyeetet.')
        .setIntegrationTypes([0,1])
        .setContexts([0,1,2])
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Die Person, die du beißen möchtest.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const randomIndex = Math.floor(Math.random() * yeetGifs.length);
        const yeetGif = yeetGifs[randomIndex];

        const user = interaction.options.getUser('user');

        if (!user) {
            const embed = {
                description: `${interaction.user} ist am yeeten. ${yeetEmoji}`,
                color: 0x800080,
                image: { url: yeetGif }
            };
            await interaction.reply({ embeds: [embed] });
        } else if (user.id === interaction.user.id) {
            const embed = {
                description: "Um zu yeeten, lasse das Argument (User) weg!",
                color: 0xFF0000
            };
            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            const embed = {
                description: `${user} du wirst von ${interaction.user} geyeetet. ${yeetEmoji}`,
                color: 0x800080,
                image: { url: yeetGif }
            };
            await interaction.reply({ content: `${user}`, embeds: [embed] });
        }
    }
};
