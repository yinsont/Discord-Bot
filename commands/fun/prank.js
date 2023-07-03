const { SlashCommandBuilder, ChannelType, VoiceChannel } = require("discord.js");
const {joinVoiceChannel} = require('@discordjs/voice')
const { useQueue, useMasterPlayer } = require("discord-player");

const { createReadStream } = require('node:fs');
const { join } = require('node:path');
const { createAudioResource, StreamType, createAudioPlayer, VoiceConnectionStatus, entersState } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("prank")
    .setDescription("prank your friends w/ a audio")
    .addStringOption((option) =>
      option
        .setName("track")
        .setDescription("The track name/url, you want to play")
        .setRequired(true)
    ),

  async execute(interaction) {
    if (!interaction.member.voice.channel)
        return interaction.reply('No')
    
      // await interaction.deferReply();
      await interaction.reply({content: 'https://media.tenor.com/SwO6NZo4KacAAAAC/scheming-evil-plan.gif', ephemeral: true})
    const voiceChannel = interaction.member.voice.channel
    
    const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: interaction.guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator,
        selfDeaf: false,
      });
    const player = createAudioPlayer()
//!--------------------------------------------------------------
    const subscription = connection.subscribe(player);

    let resource = createAudioResource(join(__dirname, 'file.mp3'))
    resource = createAudioResource(join(__dirname, 'file.mp3'), {inlineVolume: true})
    resource.volume.setVolume(0.5)

    // resource = createAudioResource(createReadStream(join(__dirname, 'file.ogg'), {
    //   inputType: StreamType.OggOpus,
    // }));

    // resource = createAudioResource(createReadStream(join(__dirname, 'file.webm'), {
    //   inputType: StreamType.WebmOpus,
    //   inlineVolume: true,
    // }));
//!---------------------------------------------------------------------------------
    player.play(resource);
    // voice.getVoiceConnection(`guild_id`).disconnect();
// subscription could be undefined if the connection is destroyed!
    if (subscription) {
	// Unsubscribe after 5 seconds (stop playing audio on the voice connection)
	setTimeout(() => connection.destroy(), 3_000);
    }
  },
}

//discordjs.guide/voice/audio-resources.html#cheat-sheet
//discordjs.guide/voice/audio-player.html#cheat-sheet

// https://www.youtube.com/watch?v=8PhdfcX9tG0
//https://www.youtube.com/watch?v=X8ipUgXH6jw