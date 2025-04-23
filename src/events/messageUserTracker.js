const messageUserMap = new Map();

module.exports = {
    trackMessageAuthor(messageId, userId) {
        messageUserMap.set(messageId, userId);
    },
    getMessageAuthor(messageId) {
        return messageUserMap.get(messageId);
    }
};
