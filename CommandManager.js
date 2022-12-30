const { Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

function loadCommands(client) {
	client.commands = new Collection();

	const commandsPaths = path.join(__dirname, 'commands');
	const commandFiles = fs.readdirSync(commandsPaths).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPaths, file);
		const command = require(filePath);

		console.log(`Loading ${command.data.name} Command from ${filePath}`);

		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

module.exports = { loadCommands };