const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('testing')
        .addStringOption(option => option.setName('string').setDescription('test')),
    async execute(interaction){
        const str = interaction.options.getString('string')

        console.log(str)
        return interaction.reply({ content: 'An attempt was made', ephemeral: true})
    }
}