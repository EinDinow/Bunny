const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');

const cuddleGifDir = '/home/discord/Bunny/src/gifs/cuddle';
const hugEmoji = "<:hug:1339326763037102101>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cuddle')
        .setDescription('Du kannst generell oder mit jemandem bestimmtes kuscheln.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2])
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Die Person, die du umarmen möchtest.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const result = getRandomGifAttachment(cuddleGifDir);
        if (!result) {
            return interaction.reply({ content: 'Keine Hug-GIFs gefunden!', ephemeral: true });
        }

        const user = interaction.options.getUser('user');

        if (!user) {
            const embed = new EmbedBuilder()
                .setDescription(`${interaction.user} ist am kuscheln. ${hugEmoji}`)
                .setColor('Purple')
                .setImage(`attachment://${result.fileName}`);

            await interaction.reply({ embeds: [embed], files: [result.attachment] });
        } else if (user.id === interaction.user.id) {
            const embed = new EmbedBuilder()
                .setDescription("Um zu kuscheln, lasse das Argument (User) weg!")
                .setColor('Red');

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            const embed = new EmbedBuilder()
                .setDescription(`${interaction.user} ist mit ${user} am kuscheln. ${hugEmoji}`)
                .setColor('Purple')
                .setImage(`attachment://${result.fileName}`);

            await interaction.reply({ content: `${user}`, embeds: [embed], files: [result.attachment] });
        }
    }
};
