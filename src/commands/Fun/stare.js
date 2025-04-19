const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');  // Verwende EmbedBuilder anstelle von MessageEmbed
const random = require('random');

// Diese GIFs sind als Beispiel, stelle sicher, dass du die richtigen URLs für deine GIFs hast
const stareGifs = [
    "https://i.imgur.com/ikOiBbi.gif",
    "https://i.imgur.com/XHKEeU1.gif",
    "https://i.imgur.com/DhXokcO.gif",
    "https://i.imgur.com/BJfnvGo.gif",
    "https://i.imgur.com/RLLb2PI.gif"
];

const stareEmoji = "<:stare:1340031606848622612>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stare')
        .setDescription('Du kannst generell oder jemanden bestimmtes anstarren.')
        .setIntegrationTypes([0,1])
        .setContexts([0,1,2])
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Die Person, die du beißen möchtest.')
                .setRequired(false)
        ),

    async execute(interaction) {
        // Wähle zufällig ein GIF aus der Liste aus
        const randomIndex = Math.floor(Math.random() * stareGifs.length);
        const stareGif = stareGifs[randomIndex];

        // Den Benutzer aus der Interaction-Option extrahieren
        const user = interaction.options.getUser('user');

        // Erstelle das Embed für die Antwort
        if (!user) {
            // Embed für Selbstbeißen
            const embed = {
                description: `${interaction.user} ist am starren ${stareEmoji}`,
                color: 0x800080,
                image: { url: stareGif }
            };
            await interaction.reply({ embeds: [embed] });
        } else if (user.id === interaction.user.id) {
            // Fehlermeldung, wenn sich der Nutzer selbst auswählt
            const embed = {
                description: "Um zu starren, lasse das Argument (User) weg!",
                color: 0xFF0000
            };
            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            // Embed für das Beißen eines anderen Nutzers
            const embed = {
                description: `${user} du wirst von ${interaction.user} angestarrt. ${stareEmoji}`,
                color: 0x800080,
                image: { url: stareGif }
            };
            await interaction.reply({ content: `${user}`, embeds: [embed] });
        }
    }
};
