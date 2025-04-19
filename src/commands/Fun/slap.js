const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');  // Verwende EmbedBuilder anstelle von MessageEmbed
const random = require('random');

// Diese GIFs sind als Beispiel, stelle sicher, dass du die richtigen URLs für deine GIFs hast
const slapGifs = [
    "https://i.imgur.com/TaUdUvq.gif",
    "https://i.imgur.com/DzH9n70.gif",
    "https://i.imgur.com/qqLtEVl.gif",
    "https://i.imgur.com/xm6mMYx.gif",
    "https://i.imgur.com/pJRmjmR.gif",
    "https://i.imgur.com/SUPE4vm.gif"
];

const slapEmoji = "<:slap:1339326910962073612>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Du kannst generell oder jemanden bestimmtes streicheln.')
        .setIntegrationTypes([0,1])
        .setContexts([0,1,2])
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Die Person, die du beißen möchtest.')
                .setRequired(false)
        ),

    async execute(interaction) {
        // Wähle zufällig ein GIF aus der Liste aus
        const randomIndex = Math.floor(Math.random() * slapGifs.length);
        const slapGif = slapGifs[randomIndex];

        // Den Benutzer aus der Interaction-Option extrahieren
        const user = interaction.options.getUser('user');

        // Erstelle das Embed für die Antwort
        if (!user) {
            // Embed für Selbstbeißen
            const embed = {
                description: `${interaction.user} ist am schlagen. ${slapEmoji}`,
                color: 0x800080,
                image: { url: slapGif }
            };
            await interaction.reply({ embeds: [embed] });
        } else if (user.id === interaction.user.id) {
            // Fehlermeldung, wenn sich der Nutzer selbst auswählt
            const embed = {
                description: "Um zu schlagen, lasse das Argument (User) weg!",
                color: 0xFF0000
            };
            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            // Embed für das Beißen eines anderen Nutzers
            const embed = {
                description: `${user} du wirst von ${interaction.user} geschlagen. ${slapEmoji}`,
                color: 0x800080,
                image: { url: slapGif }
            };
            await interaction.reply({ content: `${user}`, embeds: [embed] });
        }
    }
};
