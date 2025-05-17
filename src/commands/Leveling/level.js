const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fs = require("fs");
const path = require("path");

const levelPath = path.join(__dirname, "../../data/levels.json");
let levels = {};

if (fs.existsSync(levelPath)) {
    try {
        const raw = fs.readFileSync(levelPath);
        if (raw.length > 0) levels = JSON.parse(raw);
    } catch (err) {
        console.error("Fehler beim Lesen von levels.json", err);
    }
}

function getXPForNextLevel(level) {
    return 100 * level * level;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('level')
        .setDescription('Zeigt dein aktuelles Level und XP')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Der User, dessen Level du sehen willst')
                .setRequired(false)
        ),

    async execute(interaction) {
        const levelPath = path.join(__dirname, "../../data/levels.json");
        let levels = {};

        try {
            const raw = fs.readFileSync(levelPath);
            if (raw.length > 0) levels = JSON.parse(raw);
        } catch (err) {
            console.error("Fehler beim Lesen von levels.json", err);
        }

        const user = interaction.options.getUser('user') || interaction.user;
        const userId = user.id;

        if (!levels[userId] || typeof levels[userId].xp !== "number" || typeof levels[userId].level !== "number") {
            return await interaction.reply({
                content: `${user.username} hat noch keine XP gesammelt.`,
                ephemeral: false
            });
        }

        const { level, xp } = levels[userId];
        const nextXP = 100 * level * level;

        const embed = new EmbedBuilder()
            .setTitle(`📊 Level von \`${user.username}\``)
            .setDescription(`Level: \`${level}\`\nXP: \`${xp}\` / \`${nextXP}\``)
            .setColor("Green");

        await interaction.reply({ embeds: [embed] });
    }

};
