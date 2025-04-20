const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');

const slapEmoji = "<:slap:1339326910962073612>";
const gifFolder = '/home/discord/Bunny/src/gifs/slap';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Du kannst generell oder jemanden bestimmtes schlagen.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2])
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Die Person, die du schlagen möchtest.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const result = getRandomGifAttachment(gifFolder);
        if (!result) {
            return interaction.reply({ content: 'Keine Slap-GIFs gefunden!', ephemeral: true });
        }

        const user = interaction.options.getUser('user');
        let description;

        if (!user) {
            description = `${interaction.user} ist am schlagen. ${slapEmoji}`;
        } else if (user.id === interaction.user.id) {
            return interaction.reply({
                embeds: [{
                    description: "Um zu schlagen, lasse das Argument (User) weg!",
                    color: 0xFF0000
                }],
                ephemeral: true
            });
        } else {
            description = `${user} du wirst von ${interaction.user} geschlagen. ${slapEmoji}`;
        }

        const embed = new EmbedBuilder()
            .setDescription(description)
            .setColor('Purple')
            .setImage(`attachment://${result.fileName}`);

        await interaction.reply({
            content: user ? `${user}` : undefined,
            embeds: [embed],
            files: [result.attachment]
        });
    }
};
