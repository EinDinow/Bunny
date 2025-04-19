const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const random = require('random');

const stareGifs = [
    "https://i.imgur.com/ikOiBbi.gif",
    "https://i.imgur.com/XHKEeU1.gif",
    "https://i.imgur.com/DhXokcO.gif",
    "https://i.imgur.com/BJfnvGo.gif",
    "https://i.imgur.com/RLLb2PI.gif",
    "https://i.imgur.com/Xve30y4.gif"
];

const stareEmoji = "<:stare:1340031606848622612>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stare')
        .setDescription('Du kannst generell oder jemanden bestimmtes anstarren.')
        .setIntegrationTypes([0,1])
        .setContexts([0,1,2])
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Die Person, die du beißen möchtest.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const randomIndex = Math.floor(Math.random() * stareGifs.length);
        const stareGif = stareGifs[randomIndex];

        const user = interaction.options.getUser('user');

        if (!user) {
            const embed = {
                description: `${interaction.user} ist am starren ${stareEmoji}`,
                color: 0x800080,
                image: { url: stareGif }
            };
            await interaction.reply({ embeds: [embed] });
        } else if (user.id === interaction.user.id) {
            const embed = {
                description: "Um zu starren, lasse das Argument (User) weg!",
                color: 0xFF0000
            };
            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            const embed = {
                description: `${user} du wirst von ${interaction.user} angestarrt. ${stareEmoji}`,
                color: 0x800080,
                image: { url: stareGif }
            };
            await interaction.reply({ content: `${user}`, embeds: [embed] });
        }
    }
};
