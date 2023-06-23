const { SlashCommandBuilder, ChannelType, VoiceChannel } = require("discord.js");
const {joinVoiceChannel} = require('@discordjs/voice')
const { useQueue, useMasterPlayer } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a track or playlist from url or name")
    .addStringOption((option) =>
      option
        .setName("track")
        .setDescription("The track name/url, you want to play")
        .setRequired(true)
    ),

  async execute(interaction) {
    if (!interaction.member.voice.channel)
        return interaction.reply('No')
    
    const voiceChannel = interaction.member.voice.channel
    
    const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: interaction.guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator,
        selfDeaf: false,
      });
    
    const subscription = connection.subscribe(audioPlayer);

// subscription could be undefined if the connection is destroyed!
    if (subscription) {
	// Unsubscribe after 5 seconds (stop playing audio on the voice connection)
	setTimeout(() => subscription.unsubscribe(), 5_000);
    }
  },
};
