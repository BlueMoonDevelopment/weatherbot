import { Collection, Client } from 'discord.js';
import fs from 'fs';
import path from 'path';

export function loadCommands(client: Client) {
	client.commands = new Collection();

	const commandsPaths = path.join(__dirname, 'commands');
	const commandFiles = fs.readdirSync(commandsPaths).filter(file => file.endsWith('.ts'));

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