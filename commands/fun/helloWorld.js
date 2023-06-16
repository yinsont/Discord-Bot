const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('helloworld')
        .setDescription('Return Hello World!'),
    async execute(interaction) {
        return interaction.reply('Hello World!')
    }
}