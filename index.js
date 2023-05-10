const { Client, Collection, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({ intents: [
    GatewayIntentBits.AutoModerationConfiguration, // For the future
    GatewayIntentBits.AutoModerationExecution, // For the future
    GatewayIntentBits.DirectMessageReactions, // For the future
    GatewayIntentBits.DirectMessageTyping, // For the future
    GatewayIntentBits.DirectMessages, // For the future
    GatewayIntentBits.GuildEmojisAndStickers, // For the future
    GatewayIntentBits.GuildIntegrations, // For the future
    GatewayIntentBits.GuildInvites, // For the future
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions, // For the future
    GatewayIntentBits.GuildMessageTyping, // For the future
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.GuildModeration, // For the future
    GatewayIntentBits.GuildPresences, // For the future
    GatewayIntentBits.GuildScheduledEvents, // For the future
    GatewayIntentBits.GuildVoiceStates, // For the future
    GatewayIntentBits.GuildWebhooks, // For the future
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
