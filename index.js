const { Client, Collection, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({ intents: [
    GatewayIntentBits.AutoModerationConfiguration, // For the future
    GatewayIntentBits.AutoModerationExecution, // For the future
    GatewayIntentBits.DirectMessageReactions, // For the future
    GatewayIntentBits.DirectMessageTyping, // For the future
    GatewayIntentBits.DirectMessages, // For the future
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping, // For the future
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
]});
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();

['commands', 'events', 'buttons', 'modals', 'selectMenus'].forEach((handler) => {
    require(`./src/handlers/${handler}`)(client);
});


process.on('exit', code => { console.error(`=> Le processus s'est arrêté avec le code : ${code}`) });

process.on('uncaughtException', (err, origin) => { 
    console.error(`=> UNCAUGHT_EXCEPTION : ${err}`)
    console.error(`Origine : ${origin}`)
});

process.on('unhandledRejection', (reason, promise) => { 
    console.error(`=> UNHANDLE_REJECTION : ${{reason}}`)
    console.error(promise);
});

process.on('warning', (...args) => { console.error(...args) });


client.login(process.env.TOKEN);
