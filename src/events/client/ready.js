const { Events } = require('discord.js');
const { Logs, Vocals } = require('../../dbObjects');
const cron = require('cron');
const { syncRoles } = require('../../commands/admin/syncroles');


module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		let guildsCount = await client.guilds.fetch();
        let usersCount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

		client.user.setPresence({ status: 'online' });

        // Sync db models with db
        await Logs.sync({ alter: true });
        await Vocals.sync({ alter: true });

        // Start cron jobs
        await repeatFunction(client);

        console.log(`${client.user.username} est prêt à être utilisé par ${usersCount} utilisateurs sur ${guildsCount.size} serveurs !`);
	},
};

async function repeatFunction(client) {
    // Start at 5h all days
    const allDay = new cron.CronJob('0 0 5 * * *', async () => {
        await syncRoles(client);
    });

    allDay.start();
}