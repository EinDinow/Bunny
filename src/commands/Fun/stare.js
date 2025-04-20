const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');

const stareGifDir = '/home/discord/Bunny/src/gifs/stare';
const stareEmoji = "<:stare:1340031606848622612>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stare')
        .setDescription('Du kannst generell oder jemanden bestimmtes anstarren.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2])
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Die Person, die du anstarren möchtest.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const result = getRandomGifAttachment(stareGifDir);
        if (!result) {
            return interaction.reply({ content: 'Keine Stare‑GIFs gefunden!', ephemeral: true });
        }

        const user = interaction.options.getUser('user');
        let description;

        if (!user) {
            description = `${interaction.user} ist am starren ${stareEmoji}`;
        } else if (user.id === interaction.user.id) {
            return interaction.reply({
                embeds: [{
                    description: "Um zu starren, lasse das Argument (User) weg!",
                    color: 0xFF0000
                }],
                ephemeral: true
            });
        } else {
            description = `${user} du wirst von ${interaction.user} angestarrt. ${stareEmoji}`;
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
