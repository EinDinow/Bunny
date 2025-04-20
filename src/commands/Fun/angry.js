const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');

const angryGifDir = '/home/discord/Bunny/src/gifs/angry';
const angryEmoji = "<a:angry:1339326652240494632>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('angry')
        .setDescription('Zeige den Leuten wie wütend du bist.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const result = getRandomGifAttachment(angryGifDir);
        if (!result) {
            return interaction.reply({ content: 'Keine angry-GIFs gefunden!', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist wütend. ${angryEmoji}`)
            .setColor('Purple')
            .setImage(`attachment://${result.fileName}`);

        await interaction.reply({ embeds: [embed], files: [result.attachment] });
    }
};
