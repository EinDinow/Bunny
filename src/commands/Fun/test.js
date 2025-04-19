// testcommand.js (Cog)
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Test, um zu überprüfen, ob der Befehl funktioniert.'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setDescription('Dies ist ein Test-Embed, um zu überprüfen, ob der Befehl funktioniert!')
            .setColor('Green');
        embed.setImage('https://i.imgur.com/EEsVX3g.jpeg');
        await interaction.reply({ embeds: [embed] });
    }
};
