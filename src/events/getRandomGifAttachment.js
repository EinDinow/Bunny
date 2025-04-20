const fs = require('fs');
const path = require('path');
const { AttachmentBuilder } = require('discord.js');

/**
 * 
 * @param {string} dirPath
 * @returns {{ attachment: AttachmentBuilder, fileName: string } | null}
 */
function getRandomGifAttachment(dirPath) {
    const gifFiles = fs.readdirSync(dirPath).filter(file => file.endsWith('.gif'));
    if (gifFiles.length === 0) return null;

    const fileName = gifFiles[Math.floor(Math.random() * gifFiles.length)];
    const fullPath = path.join(dirPath, fileName);
    const attachment = new AttachmentBuilder(fullPath);

    return { attachment, fileName };
}

module.exports = getRandomGifAttachment;