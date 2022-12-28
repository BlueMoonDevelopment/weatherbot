const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('provides user info'),
	async execute(interaction) {
		await interaction.reply({ content: `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`, ephemeral: true });
	},
};