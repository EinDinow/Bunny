const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');  // Verwende EmbedBuilder anstelle von MessageEmbed
const random = require('random');

// Diese GIFs sind als Beispiel, stelle sicher, dass du die richtigen URLs für deine GIFs hast
const kissGifs = [
    "https://i.imgur.com/WWBbjG5.gif",
    "https://i.imgur.com/YNtI9K2.gif",
    "https://i.imgur.com/Gdiv5uG.gif",
    "https://i.imgur.com/oEXAQiW.gif",
    "https://i.imgur.com/hAwk8ln.gif"
];

const foreheadkissGifs = [
    "https://i.imgur.com/b2xFrcs.gif",
    "https://i.imgur.com/Gew3y7V.gif",
    "https://i.imgur.com/aHYa05Z.gif",
    "https://i.imgur.com/MZ5VUdA.gif",
    "https://i.imgur.com/uHRvAEw.gif"
]

const kissEmoji = "<a:kiss:1339326778233323601>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kiss')
        .setDescription('Küsse irgendjemanden, oder jemand bestimmtes')
        .setIntegrationTypes([0,1])
        .setContexts([0,1,2])
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
        // Wähle zufällig ein GIF aus der Liste aus
        const randomIndexkissGifs = Math.floor(Math.random() * kissGifs.length);
        const kissGif = kissGifs[randomIndexkissGifs];

        const randomIndexforeheadkissGifs = Math.floor(Math.random() * foreheadkissGifs.length);
        const foreheadkissGif = foreheadkissGifs[randomIndexforeheadkissGifs];

        const typ = interaction.options.getString('typ');
        const user = interaction.options.getUser('user');

        let description = "";
        let gifAuswahl = "";

        if (!user) {
            description = typ === "mouth" 
                ? `${interaction.user} ist am küssen. ${kissEmoji}` 
                : `${interaction.user} ist am küssen. ${kissEmoji}`;
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
            description = typ === "mouth" 
                ? `${user} du wirst von ${interaction.user} geküsst. ${kissEmoji}` 
                : `${user} du wirst von ${interaction.user} geküsst. ${kissEmoji}`;
        }

        gifAuswahl = typ === "mouth"
                ? kissGif
                : foreheadkissGif;

        const embed = new EmbedBuilder()
            .setDescription(description)
            .setColor(0x800080)
            .setImage(gifAuswahl)

        await interaction.reply({ 
            content: user ? `${user}` : undefined, 
            embeds: [embed] 
        });
            
    }
};
