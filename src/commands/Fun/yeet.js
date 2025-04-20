const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');

const yeetGifDir = '/home/discord/Bunny/src/gifs/yeet';
const yeetEmoji = "<a:yeet:1342524033547239495>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yeet')
        .setDescription('Du kannst generell oder jemanden bestimmtes geyeetet.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2])
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Die Person, die du geyeetet möchtest.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const result = getRandomGifAttachment(yeetGifDir);
        if (!result) {
            return interaction.reply({ content: 'Keine Yeet‑GIFs gefunden!', ephemeral: true });
        }

        const user = interaction.options.getUser('user');
        let description;

        if (!user) {
            description = `${interaction.user} ist am yeeten. ${yeetEmoji}`;
        } else if (user.id === interaction.user.id) {
            return interaction.reply({
                embeds: [{
                    description: "Um zu yeeten, lasse das Argument (User) weg!",
                    color: 0xFF0000
                }],
                ephemeral: true
            });
        } else {
            description = `${user} du wirst von ${interaction.user} geyeetet. ${yeetEmoji}`;
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
