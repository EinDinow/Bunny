const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');

const danceGifDir = '/home/discord/Bunny/src/gifs/dance';
const danceEmoji = "<a:dance:1339326729637855242>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dance')
        .setDescription('Zeige den Leuten wie gut du tanzen kannst.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const result = getRandomGifAttachment(danceGifDir);
        if (!result) {
            return interaction.reply({ content: 'Keine Dance-GIFs gefunden!', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist am tanzen. ${danceEmoji}`)
            .setColor('Purple')
            .setImage(`attachment://${result.fileName}`);

        await interaction.reply({ embeds: [embed], files: [result.attachment] });
    }
};
