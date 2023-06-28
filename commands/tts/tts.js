const {SlashCommandBuilder, messageLink, Message} = require('discord.js')
const say = require('say')
const gTTS = require('gtts');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tts')
        .setDescription('What would you like the bot to say?')
        .addStringOption((option) => 
            option.setName('message').setDescription('message').setRequired(true)),

    async execute(interaction) {
        const msg = interaction.options.getString('message')
        //?1118555076794003559
        
        let gtts = new gTTS(msg, 'en');
        gtts.save('./commands/tts/hello.mp3', function (err, result) {
          if(err) { throw new Error(err) }
          console.log('Success! Open file /tmp/hello.mp3 to hear result.');
        });
          
        interaction.channel.send(msg)
    }
}//https://www.edenai.co/post/top-10-text-to-speech-api 
//https://murf.ai/text-to-speech-api