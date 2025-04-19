const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');  // Verwende EmbedBuilder anstelle von MessageEmbed
const random = require('random');

// Diese GIFs sind als Beispiel, stelle sicher, dass du die richtigen URLs für deine GIFs hast
const laughGifs = [
    "https://i.imgur.com/eM5wmZR.gif",
    "https://i.imgur.com/7ROsikQ.gif",
    "https://i.imgur.com/IlzuB2h.gif",
    "https://i.imgur.com/Df1jStn.gif",
    "https://i.imgur.com/3jvGgcF.gif"
];

const laughEmoji = "<a:laugh:1339326799246655599>"; // Hier das passende Emoji einfügen

module.exports = {
    data: new SlashCommandBuilder()
        .setName('laugh')
        .setDescription('Lache alleine, mit jemandem oder über jemanden.')
        .setIntegrationTypes([0,1])
        .setContexts([0,1,2])
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
        // Wähle zufällig ein GIF aus der Liste aus
        const randomIndex = Math.floor(Math.random() * laughGifs.length);
        const laughGif = laughGifs[randomIndex];

        const typ = interaction.options.getString('typ');
        const user = interaction.options.getUser('user');

        let description = "";

        if (!user) {
            description = typ === "positiv" 
                ? `${interaction.user} ist am mitlachen. ${laughEmoji}` 
                : `${interaction.user} ist am auslachen. ${laughEmoji}`;
        } else if (user.id === interaction.user.id) {
            await interaction.reply({
                embeds: [{
                    description: "Um zu lachen, lasse das Argument (User) weg!",
                    color: 0xFF0000
                }],
                ephemeral: true
            });
            return;
        } else {
            description = typ === "positiv" 
                ? `${user} du wirst von ${interaction.user} angelacht. ${laughEmoji}` 
                : `${user} du wirst von ${interaction.user} ausgelacht. ${laughEmoji}`;
        }

        const embed = new EmbedBuilder()
            .setDescription(description)
            .setColor(0x800080)
            .setImage(laughGif);

        await interaction.reply({ embeds: [embed] });
    }
};
