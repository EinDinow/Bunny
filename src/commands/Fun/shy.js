const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');

const shyEmoji = "<a:shy:1340040688917811220>";
const gifFolder = '/home/discord/Bunny/src/gifs/shy';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shy')
        .setDescription('Zeige den Leuten wie schüchtern du bist.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const result = getRandomGifAttachment(gifFolder);
        if (!result) {
            return interaction.reply({ content: 'Keine Shy-GIFs gefunden!', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist schüchtern. ${shyEmoji}`)
            .setColor('Purple')
            .setImage(`attachment://${result.fileName}`);

        await interaction.reply({ embeds: [embed], files: [result.attachment] });
    }
};
