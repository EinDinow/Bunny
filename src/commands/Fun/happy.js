const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');

const happyGifDir = '/home/discord/Bunny/src/gifs/happy';
const happyEmoji = "<a:happy:1339326745169498247>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('happy')
        .setDescription('Zeige den Leuten wie glücklich du bist.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const result = getRandomGifAttachment(happyGifDir);
        if (!result) {
            return interaction.reply({ content: 'Keine Happy-GIFs gefunden!', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist glücklich. ${happyEmoji}`)
            .setColor('Purple')
            .setImage(`attachment://${result.fileName}`);

        await interaction.reply({ embeds: [embed], files: [result.attachment] });
    }
};
