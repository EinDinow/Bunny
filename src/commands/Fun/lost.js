const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const random = require('random');

const lostGifs = [
"https://i.imgur.com/QZ34aRv.gif",
"https://i.imgur.com/r43RyqC.gif",
"https://i.imgur.com/QnfP5h0.gif",
"https://i.imgur.com/8f3uTpQ.gif",
"https://i.imgur.com/BNM7s8Z.gif"
];

const lostEmoji = "<:lost:1340046179685367868>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lost')
        .setDescription('Zeige den Leuten wie lost du bist')
        .setIntegrationTypes([0, 1])
        .setContexts([0, 1, 2])
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Die Person, die du beißen möchtest.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const randomIndex = Math.floor(Math.random() * lostGifs.length);
        const lostGif = lostGifs[randomIndex];

        const user = interaction.options.getUser('user');

        if (!user) {
            const embed = {
                description: `${interaction.user} ist lost. ${lostEmoji}`,
                color: 0x800080,
                image: { url: lostGif }
            };
            await interaction.reply({ embeds: [embed] });
        } else if (user.id === interaction.user.id) {
            const embed = {
                description: "Um zu zeigen wie lost du bist, lasse das Argument (User) weg!",
                color: 0xFF0000
            };
            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            const embed = {
                description: `${user} ist lost. ${lostEmoji}`,
                color: 0x800080,
                image: { url: lostGif },
                footer: {
                    text: `Command ausgeführt von ${interaction.user.displayName}`,
                    icon_url: interaction.user.displayAvatarURL(),
                }
            };
            await interaction.reply({ content: `${user}`, embeds: [embed] });
        }
    }
};
