const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Say hello to someone!')
        .addUserOption(option => option.setName('target').setDescription('The user you wish to say hello to')),
    async execute(interaction) {
        const member = interaction.options.getMember('target')
        return interaction.reply(`${interaction.user.username} says hello to ${member.user.username}`)
    }
}