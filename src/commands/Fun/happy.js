const { SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require('discord.js');
const getRandomGifAttachment = require('../../events/getRandomGifAttachment');
const { trackMessageAuthor } = require('../../events/messageUserTracker');

const happyGifDir = '/home/discord/Bunny/src/gifs/happy';
const happyEmoji = "<a:happy:1339326745169498247>";

module.exports = {
    data: [
        new SlashCommandBuilder()
            .setName('happy')
            .setDescription('Zeige den Leuten wie glücklich du bist.')
            .setIntegrationTypes([0, 1])
            .setContexts([0, 1, 2]),

        new ContextMenuCommandBuilder()
            .setName('Happy auf Nachricht')
            .setType(ApplicationCommandType.Message)
            .setIntegrationTypes([0, 1])
            .setContexts([0, 1, 2]),
    ],

    async execute(interaction) {
        const result = getRandomGifAttachment(happyGifDir);

        if (!result) {
            return interaction.reply({ content: 'Keine Happy-GIFs gefunden!', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setColor('Purple')
            .setImage(`attachment://${result.fileName}`);

        if (interaction.isChatInputCommand()) {
            embed.setDescription(`${interaction.user} ist glücklich. ${happyEmoji}`);

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

            embed.setDescription(`> -# ${interaction.user} reagiert glücklich auf:\n> ${repliedContent}`);

            return await interaction.reply({
                content: `<@${originalUserId}>`,
                embeds: [embed],
                files: [result.attachment]
            });
        }
    }
};
