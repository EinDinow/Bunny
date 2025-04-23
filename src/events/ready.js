const statusArray = [
    { content: "Ein RolePlay Bot!", type: 4, status: 'Online' }
];

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('✅ Bot ist bereit!');

        async function pickPresence() {
            const option = Math.floor(Math.random() * statusArray.length);
            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: statusArray[option].content,
                            type: statusArray[option].type,
                        }
                    ],
                    status: statusArray[option].status
                });
                console.log('🟢 Präsenz aktualisiert.');
            } catch (error) {
                console.error('❌ Fehler bei Präsenz:', error);
            }
        }

        await pickPresence();
        setInterval(pickPresence, 10 * 60 * 1000);
    }
};
