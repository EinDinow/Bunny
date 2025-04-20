const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');

const hungryGifDir = '/home/discord/Bunny/src/gifs/hungry';
const hungryEmoji = "<:hungry:1363164268639424633>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hungry')
        .setDescription('Zeige den Leuten wie hungrig du bist.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const result = getRandomGifAttachment(hungryGifDir);
        if (!result) {
            return interaction.reply({ content: 'Keine Hungry-GIFs gefunden!', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist hungrig. ${hungryEmoji}`)
            .setColor('Purple')
            .setImage(`attachment://${result.fileName}`);

        await interaction.reply({ embeds: [embed], files: [result.attachment] });
    }
};
