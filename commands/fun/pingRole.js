const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping-all')
        .setDescription('Say hello to everyoneon a certain role!'),
        // .addUserOption(option => option.set),
    async execute(interaction) {
        return interaction.reply('@everyone hellos')
    }
}