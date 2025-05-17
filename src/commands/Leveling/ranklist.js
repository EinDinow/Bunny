const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fs = require("fs");
const path = require("path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ranklist')
        .setDescription('Zeigt die Top 10 Nutzer auf diesem Server'),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const levelPath = path.join(__dirname, "../../data/levels.json");
            let levels = {};

            try {
                const raw = fs.readFileSync(levelPath);
                if (raw.length > 0) levels = JSON.parse(raw);
            } catch (err) {
                console.error("Fehler beim Lesen von levels.json", err);
                return await interaction.editReply("❌ Fehler beim Laden der Rangliste.");
            }

            const guild = interaction.guild;

            try {
                await guild.members.fetch();
            } catch (err) {
                console.error("Fehler beim Laden der Mitglieder", err);
                return await interaction.editReply("❌ Konnte die Mitgliederliste nicht laden.");
            }

            const filtered = Object.entries(levels).filter(([userId]) =>
                guild.members.cache.has(userId)
            );

            if (filtered.length === 0) {
                return await interaction.editReply("❌ Keine Server-Mitglieder mit Leveln gefunden.");
            }

            const sorted = filtered
                .sort(([, a], [, b]) => b.level - a.level)
                .slice(0, 10);

            const embed = new EmbedBuilder()
                .setTitle(`🏆 Rangliste von \`${guild.name}\``)
                .setColor("Gold");

            let position = 1;
            for (const [userId, data] of sorted) {
                let username = `Unbekannt (${userId})`;
                try {
                    const user = await interaction.client.users.fetch(userId);
                    if (user) username = user.username;
                } catch {
                }

                embed.addFields({
                    name: `#${position} – ${username}`,
                    value: `Level: **${data.level}**, XP: **${data.xp}**`,
                    inline: false
                });

                position++;
            }

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error("Fehler im Ranklist-Command:", error);
            await interaction.editReply("❌ Es ist ein Fehler aufgetreten.");
        }
    }
};
