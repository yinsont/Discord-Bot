const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const gTTS = require("gtts");
const { joinVoiceChannel } = require("@discordjs/voice");
const { join } = require("node:path");
const { createAudioResource, createAudioPlayer } = require("@discordjs/voice");
// Array to store the history of responses
const responseHistory = [];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chatgpt-voice")
    .setDescription("State your demands to our lord")
    .addStringOption((option) =>
      option
        .setName("demand")
        .setDescription("What would you like our lord and savior to do?")
        .setRequired(true)
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
    if (!interaction.member.voice.channel) return interaction.reply("No");

    const volume = interaction.options.getNumber("volume") || 0.5;

    const demand = interaction.options.getString("demand");

    // Acknowledge the command and provide an initial response
    await interaction.deferReply();
    await interaction.editReply(
      "https://media.tenor.com/Q3Kms4iVVo0AAAAC/hmm-spongebob.gif"
    );

    const configuration = new Configuration({
      apiKey: process.env.API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    let messages = [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Hello world" },
    ];

    // Add historical responses to the messages array
    for (const response of responseHistory) {
      messages.push({ role: "user", content: response });
    }

    messages.push({ role: "user", content: demand });

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const newresult = completion.data.choices[0].message.content;

    // Store the response in the history array
    responseHistory.push(newresult);

    // Perform additional processing if needed
    // ...

    // Provide the final result as an update to the initial response
    await interaction.editReply(
      `Processing completed!\n\nDemand: ${demand}\n\nResult:\n${newresult}`
    );
    // const msg = interaction.options.getString('message')
    //?1118555076794003559
    const accent = interaction.options.getString("accent");
    console.log(newresult);
    let gtts = new gTTS(newresult, accent);
    await new Promise((resolve, reject) => {
      gtts.save("./commands/chatGPT/hello.mp3", function (err, result) {
        if (err) {
          reject(err);
        } else {
          console.log(
            "Success! Open file ./commands/chatGPT/hello.mp3 to hear result."
          );
          resolve();
        }
      });
    });
    
    const voiceChannel = interaction.member.voice.channel;

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
      selfDeaf: false,
    });
    const player = createAudioPlayer();
    const subscription = connection.subscribe(player);
    let resource = createAudioResource(join(__dirname, "hello.mp3"));
    resource = createAudioResource(join(__dirname, "hello.mp3"), {
      inlineVolume: true,
    });
    resource.volume.setVolume(volume);

    player.play(resource);
  },
};
