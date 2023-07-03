const { SlashCommandBuilder, messageLink, Message } = require("discord.js");
// const say = require('say')
const gTTS = require("gtts");
const { joinVoiceChannel } = require("@discordjs/voice");
const { join } = require("node:path");
const { createAudioResource, createAudioPlayer } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tts")
    .setDescription("What would you like the bot to say?")
    .addStringOption((option) =>
      option.setName("message").setDescription("message").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("accent")
        .setDescription(
          "Choose from these accents: en, fr, zh-CN, zh-TW, pt, es"
        )
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("volume")
        .setDescription("Set Volume Level 0-10(recommend 0.5)")
    ),

  async execute(interaction) {
    const volume = interaction.options.getNumber("volume") || 0.5;
    const msg = interaction.options.getString("message");

    //?1118555076794003559
    const accent = interaction.options.getString("accent");
    let gtts = new gTTS(msg, accent);
    await new Promise((resolve, reject) => {
      gtts.save("./commands/tts/tts.mp3", function (err, result) {
        if (err) {
          reject(err);
        } else {
          console.log(
            "Success! Open file ./commands/tts/tts.mp3 to hear result."
          );
          resolve();
        }
      });
    });
    // interaction.reply({content: 'ok', ephemeral: true})
    interaction.channel.send(msg);

    if (!interaction.member.voice.channel) return interaction.reply("No");

    const voiceChannel = interaction.member.voice.channel;

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
      selfDeaf: false,
    });
    const player = createAudioPlayer();
    const subscription = connection.subscribe(player);
    let resource = createAudioResource(join(__dirname, "tts.mp3"));
    resource = createAudioResource(join(__dirname, "tts.mp3"), {
      inlineVolume: true,
    });
    resource.volume.setVolume(volume);
    // console.log(volume)
    player.play(resource);
  },
}; //https://www.edenai.co/post/top-10-text-to-speech-api
//https://murf.ai/text-to-speech-api
//https://gtts.readthedocs.io/en/latest/module.html#
// https://docs.descriptapi.com/
//https://docs.descriptapi.com/
