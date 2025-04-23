const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');

const cryGifDir = '/home/discord/Bunny/src/gifs/cry';
const cryEmoji = "<:cry:1339326711354888253>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cry')
        .setDescription('Zeige den Leuten wie sehr du weinen musst.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const result = getRandomGifAttachment(cryGifDir);
        if (!result) {
            return interaction.reply({ content: 'Keine Cry-GIFs gefunden!', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist am weinen. ${cryEmoji}`)
            .setColor('Purple')
            .setImage(`attachment://${result.fileName}`);

        await interaction.reply({ embeds: [embed], files: [result.attachment] });
    }
};
