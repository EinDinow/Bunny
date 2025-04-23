const { SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');
const { trackMessageAuthor } = require('../../events/messageUserTracker');

const cryGifDir = '/home/discord/Bunny/src/gifs/cry';
const cryEmoji = "<:cry:1339326711354888253>";

module.exports = {
    data: [
        new SlashCommandBuilder()
            .setName('cry')
            .setDescription('Zeige den Leuten das du weinen musst.')
            .setIntegrationTypes([0, 1])
            .setContexts([0, 1, 2]),
        
        new ContextMenuCommandBuilder()
            .setName('Cry auf Nachricht')
            .setType(ApplicationCommandType.Message)
            .setIntegrationTypes([0, 1])
            .setContexts([0, 1, 2]),
    ],

    async execute(interaction) {
        const result = getRandomGifAttachment(cryGifDir);

        if (!result) {
            return interaction.reply({ content: 'Keine Cry-GIFs gefunden!', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setColor('Purple')
            .setImage(`attachment://${result.fileName}`);

        if (interaction.isChatInputCommand()) {
            embed.setDescription(`${interaction.user} ist am weinen. ${cryEmoji}`);

            await interaction.reply({
                embeds: [embed],
                files: [result.attachment]
            });

            const replyMsg = await interaction.fetchReply();
            trackMessageAuthor(replyMsg.id, interaction.user.id);
        }         

        if (interaction.isMessageContextMenuCommand()) {
            const targetMessage = interaction.targetMessage;
            const repliedContent = targetMessage.content?.trim() || "*[Embed]*";

            const { getMessageAuthor } = require('../../events/messageUserTracker');
            const originalUserId = getMessageAuthor(targetMessage.id) || targetMessage.author.id;
       
            embed.setDescription(`> -# ${interaction.user} reagiert weinerlich auf:\n> ${repliedContent}`);
        
            return await interaction.reply({
                content: `<@${originalUserId}>`,
                embeds: [embed],
                files: [result.attachment]
            });
        }
    }
};
