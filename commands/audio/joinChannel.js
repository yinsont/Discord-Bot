const {SlashCommandBuilder, ChannelType} = require('discord.js')
const {joinVoiceChannel, getVoiceConnections} = require('@discordjs/voice')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Joins a Voice Channel')
        .addChannelOption(option => 
            option.setName('channel')
            .setDescription('The channel to join')
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildVoice)),

    async execute(interaction){
        const voiceChannel = interaction.options.getChannel('channel')
        const voiceConnection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
            selfDeaf: false,
        })

        console.log(getVoiceConnections())
        await interaction.reply(`Joined ${voiceChannel}`)
    }
}
//https://www.youtube.com/watch?v=lyc3EjjXQfo