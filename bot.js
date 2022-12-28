// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const cmdmanager = require('./CommandManager.js');
const eventmanager = require('./EventManager.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load events
eventmanager.loadEvents(client);

// Load commands
cmdmanager.loadCommands(client);

// Log in to Discord with your client token
client.login(token);
