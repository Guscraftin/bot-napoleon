const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const { REST, Routes } = require('discord.js');

module.exports = async (client) => {
    const commands = [];
    let infoCommand = [];

    (await pGlob(`${process.cwd()}/src/commands/*/*.js`, { windowsPathsNoEscape: process.env.ON_WINDOWS })).map(async (cmdFile) => {
        const cmd = require(cmdFile);
        
        if (cmd.data.name === 'infos') {
            infoCommand = [cmd.data.toJSON()];
        } else {
            commands.push(cmd.data.toJSON());
        }

        if ('data' in cmd && 'execute' in cmd) {
            client.commands.set(cmd.data.name, cmd);
        } else {
            console.log(`[AVERTISSEMENT] La commande à ${cmdFile} manque le champs "data" ou "execute".`);
        }
    });

    const commandCount = infoCommand.length === 0 ? commands.length : commands.length+1;
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    (async () => {
        try {
            console.log(`Lancement du déploiement des ${commandCount} slash commandes (/).`);
    
            const deploy = [
                // rest.put(
                //     Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID_MAIN),
                //     { body: commands },
                // ),
                // rest.put(
                //     Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID_FR),
                //     { body: commands },
                // ),
                // rest.put(
                //     Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID_EN),
                //     { body: commands },
                // ),
                // rest.put(
                //     Routes.applicationCommands(process.env.CLIENT_ID),
                //     { body: infoCommand },
                // )
                rest.put(
                    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                    { body: commands },
                )
            ];
    
            await Promise.all(deploy);
            console.log(`Déploiement des ${commandCount} slash commandes (/) réussit.`);
        } catch (error) {
            console.error(error);
        }
    })();
};