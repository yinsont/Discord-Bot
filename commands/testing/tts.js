const {SlashCommandBuilder, messageLink, Message} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tts')
        .setDescription('What would you like the bot to say?')
        .addStringOption((option) => 
            option.setName('message').setDescription('message').setRequired(true)),

    async execute(interaction) {
        const msg = interaction.options.getString('message')
        //?1118555076794003559
        await interaction.channel.send({ content: '/tts ' + msg, tts: true})
    }
}//https://www.edenai.co/post/top-10-text-to-speech-api 
//https://murf.ai/text-to-speech-api