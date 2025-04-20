const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');

const lostEmoji = "<:lost:1340046179685367868>";
const gifFolder = '/home/discord/Bunny/src/gifs/lost';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lost')
        .setDescription('Zeige den Leuten wie lost du bist')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2])
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Die Person, die du als lost bezeichnen willst.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const result = getRandomGifAttachment(gifFolder);
        if (!result) {
            return interaction.reply({ content: 'Keine Lost-GIFs gefunden!', ephemeral: true });
        }

        const user = interaction.options.getUser('user');

        let description;
        if (!user) {
            description = `${interaction.user} ist lost. ${lostEmoji}`;
        } else if (user.id === interaction.user.id) {
            return interaction.reply({
                embeds: [{
                    description: "Um zu zeigen wie lost du bist, lasse das Argument (User) weg!",
                    color: 0xFF0000
                }],
                ephemeral: true
            });
        } else {
            description = `${user} ist lost. ${lostEmoji}`;
        }

        const embed = new EmbedBuilder()
            .setDescription(description)
            .setColor(0x800080)
            .setImage(`attachment://${result.fileName}`)
            .setFooter({
                text: `Command ausgeführt von ${interaction.user.displayName}`,
                iconURL: interaction.user.displayAvatarURL()
            });

        await interaction.reply({
            content: user ? `${user}` : undefined,
            embeds: [embed],
            files: [result.attachment]
        });
    }
};
