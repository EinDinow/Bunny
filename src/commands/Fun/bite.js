const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');

const biteGifDir = '/home/discord/Bunny/src/gifs/bite';
const biteEmoji = "<a:bite:1339326674210258985>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bite')
        .setDescription('Du kannst generell oder jemanden bestimmtes beißen.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2])
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Die Person, die du beißen möchtest.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const result = getRandomGifAttachment(biteGifDir);
        if (!result) {
            return interaction.reply({ content: 'Keine Bite-GIFs gefunden!', ephemeral: true });
        }

        const user = interaction.options.getUser('user');

        if (!user) {
            const embed = new EmbedBuilder()
                .setDescription(`${interaction.user} ist am Beißen. ${biteEmoji}`)
                .setColor('Purple')
                .setImage(`attachment://${result.fileName}`);

            return interaction.reply({ embeds: [embed], files: [result.attachment] });
        }

        if (user.id === interaction.user.id) {
            const embed = new EmbedBuilder()
                .setDescription("Um zu beißen, lasse das Argument (User) weg!")
                .setColor('Red');

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setDescription(`${user} du wirst von ${interaction.user} gebissen. ${biteEmoji}`)
            .setColor('Purple')
            .setImage(`attachment://${result.fileName}`);

        return interaction.reply({ content: `${user}`, embeds: [embed], files: [result.attachment] });
    }
};
