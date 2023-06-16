const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Return Hello World!'),
    async execute(interaction) {
        return interaction.reply('Hello World!')
    }
}