const {SlashCommandBuilder, messageLink, Message} = require('discord.js')
// const say = require('say')
const gTTS = require('gtts');
const {joinVoiceChannel} = require('@discordjs/voice')
const {join} = require('node:path')
const {createAudioResource, createAudioPlayer} = require('@discordjs/voice')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tts')
        .setDescription('What would you like the bot to say?')
        .addStringOption((option) => 
            option.setName('message').setDescription('message').setRequired(true))
        .addStringOption((option) =>
        option
          .setName("language")
          .setDescription("en, fr, zh-CN, zh-TW, pt, es")
          .setRequired(true)
      ),

    async execute(interaction) {
        const msg = interaction.options.getString('message')
        //?1118555076794003559
        const language = interaction.options.getString('language')
        let gtts = new gTTS(msg, language);
        await new Promise((resolve, reject) => {
          gtts.save('./commands/tts/hello.mp3', function (err, result) {
            if (err) {
              reject(err);
            } else {
              console.log('Success! Open file ./commands/tts/hello.mp3 to hear result.');
              resolve();
            }
          });
        });
        // interaction.reply({content: 'ok', ephemeral: true})
        interaction.channel.send(msg);
        
        if (!interaction.member.voice.channel) return interaction.reply('No')
        
        const voiceChannel = interaction.member.voice.channel
  
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
            selfDeaf: false,
          });
        const player = createAudioPlayer()
        const subscription = connection.subscribe(player);
        let resource = createAudioResource(join(__dirname, 'hello.mp3'))
        resource = createAudioResource(join(__dirname, 'hello.mp3'), {inlineVolume: true})
        resource.volume.setVolume(0.5)

        player.play(resource);
    }
}//https://www.edenai.co/post/top-10-text-to-speech-api 
//https://murf.ai/text-to-speech-api
//https://gtts.readthedocs.io/en/latest/module.html#