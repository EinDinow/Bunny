const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder, Collection } = require("discord.js");
const fs = require('fs');

const clientId = '1338942707841892492'; 
const guildId = 'YOUR GUILD ID';

module.exports = (client) => {
    client.commands = new Collection(); // Sicherstellen, dass die Collection existiert

    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                
                client.commandArray.push(
                    command.data instanceof SlashCommandBuilder ? command.data.toJSON() : command.data
                );
            }
        }

        const rest = new REST({ version: '9' }).setToken(process.env.token);

        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationCommands(clientId), { body: client.commandArray }
            );

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error('Error reloading commands:', error);
        }
    };

    client.once('ready', () => {
        console.log(`Logged in as ${client.user.tag}`);

        client.user.setPresence({
            activities: [{ name: 'Ein RP Bot!', type: 4 }],
            status: 'online'
        });

        console.log('Presence set successfully.');
    });
};
