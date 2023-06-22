const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user-info')
        .setDescription('Get the user\'s info')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user you wish to get info of')
                .setRequired(true)),

    async execute(interaction){
        // console.log(interaction)
        const member = interaction.options.getMember('user')
        // console.log(interaction)
        // console.log('🧩')
        // console.log(member)
        // console.log('🧩')
        console.log(member.user)
        return interaction.reply('Data being sent to console')
    }
}