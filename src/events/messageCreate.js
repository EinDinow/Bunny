const fs = require("fs");
const path = require("path");

const levelPath = path.join(__dirname, "../data/levels.json");
let levels = {};

if (fs.existsSync(levelPath)) {
    levels = JSON.parse(fs.readFileSync(levelPath));
}

function saveLevels() {
    fs.writeFileSync(levelPath, JSON.stringify(levels, null, 2));
}

function getXPForNextLevel(level) {
    return 100 * level * level;
}

module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        if (message.author.bot || !message.guild) return;

        const userId = message.author.id;

        if (!levels[userId]) {
            levels[userId] = { xp: 0, level: 1 };
        }

        levels[userId].xp += 10;

        const currentLevel = levels[userId].level;
        const neededXP = getXPForNextLevel(currentLevel);

        if (levels[userId].xp >= neededXP) {
            levels[userId].xp -= neededXP;
            levels[userId].level++;
            message.channel.send(`🎉 \`${message.author}\`, du bist jetzt Level \`${levels[userId].level}\`!`);
        }

        saveLevels();
    },
};
