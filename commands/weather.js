const { SlashCommandBuilder } = require('discord.js');
const weather = require('openweather-apis');
const wait = require('node:timers/promises').setTimeout;
const { openweathermap_api_id } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weather')
		.setDescription('Replies to you with the weather!')
		.addStringOption(option =>
			option.setName('city')
				.setDescription('The city')
				// Ensure the text will fit in an embed description, if the user chooses that option
				.setRequired(true))
		.addStringOption(option =>
			option.setName('units')
				.setDescription('The unit to reply in')
				.setRequired(true)
				.addChoices(
					{ name: 'Metric units', value: 'metric' },
					{ name: 'Imperial units', value: 'imperial' },
					{ name: 'Internal units', value: 'internal' },
				),
		),
	async execute(interaction) {
		const locale = interaction.locale ?? 'en';
		const city = interaction.options.getString('city');
		const units = interaction.options.getString('units');

		weather.setLang(locale);
		weather.setCity(city);
		weather.setUnits(units);
		weather.setAPPID(openweathermap_api_id);

		let temperature = 0.0;

		await weather.getTemperature(function (err, temp) {
			if (err) console.log(err);
			temperature = temp;
		});

		// TODO: Hacky way, needs to be changed later!!
		await wait(100);

		interaction.reply({ content: `Temperature: ${temperature}`, ephermal: true });
	},
};