const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');

const blushGifDir = '/home/discord/Bunny/src/gifs/blush';
const blushEmoji = "<a:blush:1339326689678852147>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blush')
        .setDescription('Zeige den Leuten wie errötet du bist.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const result = getRandomGifAttachment(blushGifDir);
        if (!result) {
            return interaction.reply({ content: 'Keine Blush-GIFs gefunden!', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist errötet. ${blushEmoji}`)
            .setColor('Purple')
            .setImage(`attachment://${result.fileName}`);

        await interaction.reply({ embeds: [embed], files: [result.attachment] });
    }
};
