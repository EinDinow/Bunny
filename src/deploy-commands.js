const { REST, Routes } = require('discord.js');
const { readdirSync } = require('fs');
const path = require('path');
require('dotenv').config();

const commands = [];
const commandsPath = path.join(__dirname, 'src/commands');

// Alle Unterordner (z. B. utility/, moderation/, etc.)
const commandFolders = readdirSync(commandsPath);

for (const folder of commandFolders) {
    const commandFiles = readdirSync(path.join(commandsPath, folder)).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./src/commands/${folder}/${file}`);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.warn(`[WARN] Die Command-Datei ${file} fehlt "data" oder "execute".`);
        }
    }
}

const rest = new REST({ version: '10' }).setToken(process.env.token);

// 🌐 GLOBAL oder 🛠️ GUILD? → guild = sofort sichtbar
const CLIENT_ID = process.env.clientId;
const GUILD_ID = process.env.guildId;

(async () => {
    try {
        console.log(`📤 Starte Registrierung von ${commands.length} Slash Commands...`);

        // GUILD-Commands (nur für Dev-Server)
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        );

        console.log('✅ Erfolgreich in Gilde registriert (Guild Commands).');

    } catch (error) {
        console.error('❌ Fehler beim Registrieren:', error);
    }
})();
