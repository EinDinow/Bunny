const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');

const sadEmoji = "<:cry:1339326711354888253>";
const gifFolder = '/home/discord/Bunny/src/gifs/cry';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sad')
        .setDescription('Zeige den Leuten wie traurig du bist.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2]),

    async execute(interaction) {
        const result = getRandomGifAttachment(gifFolder);
        if (!result) {
            return interaction.reply({ content: 'Keine traurigen GIFs gefunden!', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} ist traurig. ${sadEmoji}`)
            .setColor(0x800080)
            .setImage(`attachment://${result.fileName}`);

        await interaction.reply({
            embeds: [embed],
            files: [result.attachment]
        });
    }
};
