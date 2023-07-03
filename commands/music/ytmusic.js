const {
  SlashCommandBuilder,
  ChannelType,
  VoiceChannel,
} = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
const { useQueue, useMasterPlayer } = require("discord-player");

const { createReadStream } = require("node:fs");
const { join } = require("node:path");
const {
  createAudioResource,
  StreamType,
  createAudioPlayer,
  VoiceConnectionStatus,
  entersState,
} = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("play a song from your yt link")
    .addStringOption((option) =>
      option.setName("link").setDescription("song link").setRequired(true)
    ),

  async execute(interaction) {},
};
