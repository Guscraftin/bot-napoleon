# Bot-napoléon

Voici la structure pour créer un bot général.

## Setup du bot
### Installation du bot

- Clone ce répertoire (avoir git installé)
- Remplir le fichier `.env` avec vos valeurs
- Exécuter la commmande `npm i` à la racine du dossier précédemment clone (avoir nodejs installé)

### Lancement du bot

- Exécuter la commmande `node .` dans le dossier précédemment clone



## ToDo:

[x] Put in one line the error where: Unknown interaction 
[ ] Fix Unknown interaction when person interact for the first time (with an old button ?)

[ ] Add all logs [EN COURS]
[ ] Add automatically roles when enter ou leave the staff
[ ] Deploy commands only on 3 servers except for /infos (create the command and invite people who are not already on the main server ? really util ? it is consider as spam people MP who can report the bot ? Warning 100 servers, lose permissions; two bots ?)


### Commands
- dbinitlogs: create the line for a guild in logs db (admin only)
- dbconfig: update the database (admin only) 
- dbvocals: different commands to control vocals db (admin only)
- docs: send information message (admin only)
- info: information about the bot
- syncroles: force syncro roles between discord servers (admin only)

### Features
- Logs in several channels according of the type (use database)
- Syncro roles between discord servers all day at 5am (verify) (fr/en, dirigeants en/fr, staff, haut staff)