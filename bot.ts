import { Client, GatewayIntentBits } from 'discord.js';
import { token } from './config.json';

import { loadEvents } from './EventManager';
import { loadCommands } from './CommandManager';


// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load events
loadEvents(client);

// Load commands
loadCommands(client);

// Log in to Discord with your client token
client.login(token);