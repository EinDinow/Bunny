const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');

const desperateGifDir = '/home/discord/Bunny/src/gifs/desperate';
const desperateEmoji = "<:desperate:1345463280214478958>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('desperate')
        .setDescription('Zeige den Leuten wie verzweifelt du bist')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const result = getRandomGifAttachment(desperateGifDir);
        if (!result) {
            return interaction.reply({ content: 'Keine Desperate-GIFs gefunden!', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist verzweifelt. ${desperateEmoji}`)
            .setColor('Purple')
            .setImage(`attachment://${result.fileName}`);

        await interaction.reply({ embeds: [embed], files: [result.attachment] });
    }
};
