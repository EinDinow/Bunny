const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');

const laughEmoji = "<a:laugh:1339326799246655599>";
const gifFolder = '/home/discord/Bunny/src/gifs/laugh';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('laugh')
        .setDescription('Lache alleine, mit jemandem oder über jemanden.')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2])
        .addStringOption(option =>
            option.setName('typ')
                .setDescription('Positiv: z.B. lacht mit, Negativ: z.B. lacht aus')
                .setRequired(true)
                .addChoices(
                    { name: 'Positiv', value: 'positiv' },
                    { name: 'Negativ', value: 'negativ' }
                )
        )
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Die Person, die du anlachen oder auslachen möchtest.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const typ = interaction.options.getString('typ');
        const user = interaction.options.getUser('user');

        const result = getRandomGifAttachment(gifFolder);
        if (!result) {
            return interaction.reply({ content: 'Keine Laugh-GIFs gefunden!', ephemeral: true });
        }

        let description;

        if (!user) {
            description = typ === "positiv"
                ? `${interaction.user} ist am mitlachen. ${laughEmoji}`
                : `${interaction.user} ist am auslachen. ${laughEmoji}`;
        } else if (user.id === interaction.user.id) {
            return interaction.reply({
                embeds: [{
                    description: "Um zu lachen, lasse das Argument (User) weg!",
                    color: 0xFF0000
                }],
                ephemeral: true
            });
        } else {
            description = typ === "positiv"
                ? `${user} du wirst von ${interaction.user} angelacht. ${laughEmoji}`
                : `${user} du wirst von ${interaction.user} ausgelacht. ${laughEmoji}`;
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
