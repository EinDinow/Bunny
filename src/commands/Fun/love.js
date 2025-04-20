const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');

const loveEmoji = "<:love:1339326840191451146>";
const gifFolder = '/home/discord/Bunny/src/gifs/love';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('love')
        .setDescription('Du kannst generell oder jemanden bestimmtes lieben.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2])
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Die Person, die du lieben möchtest.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const result = getRandomGifAttachment(gifFolder);
        if (!result) {
            return interaction.reply({ content: 'Keine Love-GIFs gefunden!', ephemeral: true });
        }

        const user = interaction.options.getUser('user');

        let description;
        if (!user) {
            description = `${interaction.user} ist verliebt ${loveEmoji}`;
        } else if (user.id === interaction.user.id) {
            return interaction.reply({
                embeds: [{
                    description: "Um verliebt zu sein, lasse das Argument (User) weg!",
                    color: 0xFF0000
                }],
                ephemeral: true
            });
        } else {
            description = `${user} du wirst von ${interaction.user} geliebt. ${loveEmoji}`;
        }

        const embed = new EmbedBuilder()
            .setDescription(description)
            .setColor(0x800080)
            .setImage(`attachment://${result.fileName}`);

        await interaction.reply({
            content: user ? `${user}` : undefined,
            embeds: [embed],
            files: [result.attachment]
        });
    }
};
