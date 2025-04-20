const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');

const sparkleGifDir = '/home/discord/Bunny/src/gifs/sparkle';
const sparkleEmoji = "<a:sparkle:1342918035211812894>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sparkle')
        .setDescription('Zeige den Leuten wie sehr du funkelst')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const result = getRandomGifAttachment(sparkleGifDir);
        if (!result) {
            return interaction.reply({ content: 'Keine Sparkle‑GIFs gefunden!', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist am funkeln. ${sparkleEmoji}`)
            .setColor(0x800080)
            .setImage(`attachment://${result.fileName}`);

        await interaction.reply({ embeds: [embed], files: [result.attachment] });
    }
};
