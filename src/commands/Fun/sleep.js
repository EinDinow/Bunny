const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');

const sleepGifDir = '/home/discord/Bunny/src/gifs/sleep';
const sleepEmoji = "<a:sleep:1339712344129011755>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sleep')
        .setDescription('Zeige den Leuten das du am schlafen bist.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const result = getRandomGifAttachment(sleepGifDir);
        if (!result) {
            return interaction.reply({ content: 'Keine Sleep‑GIFs gefunden!', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist am schlafen. ${sleepEmoji}`)
            .setColor(0x800080)
            .setImage(`attachment://${result.fileName}`);

        await interaction.reply({ embeds: [embed], files: [result.attachment] });
    }
};
