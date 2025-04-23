const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder, ContextMenuCommandBuilder, Collection } = require("discord.js");
const fs = require('fs');

const clientId = '1338942707841892492';
const guildId = 'YOUR GUILD ID';

module.exports = (client) => {
    client.commands = new Collection();

    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);

                if (!command.data || !command.execute) {
                    console.warn(`[WARN] Die Datei ${file} im Ordner ${folder} hat kein data oder execute!`);
                    continue;
                }

                if (Array.isArray(command.data)) {
                    command.data.forEach(cmd => {
                        client.commands.set(cmd.name, command);
                        client.commandArray.push(cmd.toJSON());
                    });
                } else {
                    client.commands.set(command.data.name, command);
                    client.commandArray.push(command.data.toJSON());
                }
            }
        }

        const rest = new REST({ version: '9' }).setToken(process.env.token);

        try {
            console.log('⏳ Registriere (/) und Context Menu Commands...');

            await rest.put(
                Routes.applicationCommands(clientId),
                { body: client.commandArray }
            );

            console.log('✅ Erfolgreich registriert!');
        } catch (error) {
            console.error('❌ Fehler beim Registrieren:', error);
        }
    };

    client.once('ready', () => {
        console.log(`🟢 Eingeloggt als ${client.user.tag}`);

        client.user.setPresence({
            activities: [{ name: 'Ein RP Bot!', type: 4 }],
            status: 'online'
        });

        console.log('🟢 Präsenz gesetzt.');
    });
};
