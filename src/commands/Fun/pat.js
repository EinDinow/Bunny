const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');

const patEmoji = "<a:pat:1339326891105980537>";
const gifFolder = '/home/discord/Bunny/src/gifs/pat';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pat')
        .setDescription('Du kannst generell oder jemanden bestimmtes streicheln.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2])
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Die Person, die du streicheln möchtest.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const result = getRandomGifAttachment(gifFolder);
        if (!result) {
            return interaction.reply({ content: 'Keine Pat-GIFs gefunden!', ephemeral: true });
        }

        const user = interaction.options.getUser('user');

        let description;
        if (!user) {
            description = `${interaction.user} ist am streicheln. ${patEmoji}`;
        } else if (user.id === interaction.user.id) {
            return interaction.reply({
                embeds: [{
                    description: "Um zu streicheln, lasse das Argument (User) weg!",
                    color: 0xFF0000
                }],
                ephemeral: true
            });
        } else {
            description = `${user} du wirst von ${interaction.user} gestreichelt. ${patEmoji}`;
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
