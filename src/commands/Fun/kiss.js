const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');

const kissEmoji = "<a:kiss:1339326778233323601>";
const baseDir = '/home/discord/Bunny/src/gifs/kiss';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kiss')
        .setDescription('Küsse irgendjemanden, oder jemand bestimmtes')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2])
        .addStringOption(option =>
            option.setName('typ')
                .setDescription('Mouth z.B. Küsst auf den Mund, Forehead z.B. Stirn/Wange')
                .setRequired(true)
                .addChoices(
                    { name: 'Mouth', value: 'mouth' },
                    { name: 'Forehead', value: 'forehead' }
                )
        )
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Die Person, die du küssen möchtest.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const typ = interaction.options.getString('typ');
        const user = interaction.options.getUser('user');
        const gifFolder = `${baseDir}/${typ}`;

        const result = getRandomGifAttachment(gifFolder);
        if (!result) {
            return interaction.reply({ content: 'Keine Kuss-GIFs gefunden!', ephemeral: true });
        }

        let description;

        if (!user) {
            description = `${interaction.user} ist am küssen. ${kissEmoji}`;
        } else if (user.id === interaction.user.id) {
            return interaction.reply({
                embeds: [{
                    description: "Um zu küssen, lasse das Argument (User) weg!",
                    color: 0xFF0000
                }],
                ephemeral: true
            });
        } else {
            description = `${user} du wirst von ${interaction.user} geküsst. ${kissEmoji}`;
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
