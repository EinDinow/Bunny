const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');

const boredGifDir = '/home/discord/Bunny/src/gifs/bored';
const boredEmoji = "<a:bored:1340049895939113063>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bored')
        .setDescription('Zeige den Leuten wie gelangweilt du bist')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const result = getRandomGifAttachment(boredGifDir);
        if (!result) {
            return interaction.reply({ content: 'Keine Bored-GIFs gefunden!', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist gelangweilt ${boredEmoji}`)
            .setColor('Purple')
            .setImage(`attachment://${result.fileName}`);

        await interaction.reply({ embeds: [embed], files: [result.attachment] });
    }
};
