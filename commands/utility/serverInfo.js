const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-info')
        .setDescription('Get the server\'s info'),

    async execute(interaction){
        const {guild} = interaction
        const {members} = guild
        const {name, ownerId, createdTimeStamp, memberCount} = guild
        const icon = guild.iconURL() || 'https://cdn.discordapp.com/avatars/1088465667050709054/46f5980f7e9190388a63a7bbe69b643a.webp'
        const roles = guild.roles.cache.size
        const emojis = guild.emojis.cache.size;
        const id = guild.id

        let baseVerification = guild.verificationLevel
        
        if (baseVerification == 0) baseVerification = "None"
        if (baseVerification == 1) baseVerification = "Low"
        if (baseVerification == 2) baseVerification = "Medium"
        if (baseVerification == 3) baseVerification = "High"
        if (baseVerification == 4) baseVerification = "Max"

        console.log(guild)

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setThumbnail(icon)
        .setAuthor({name: name, iconURL: icon})
        .setFooter({text: `Server ID: ${id}`})
        .setTimestamp()

        .addFields({name: 'Name', value: `${name}`, inline: false})
        // .addFields({name: 'Date Created', value: `<t:${parseInt(createdTimeStamp / 1000)}:R> (hover for complete date)`, inline: false})
        .addFields({name: 'Server Owner', value: `<@${ownerId}>`, inline: true})
        .addFields({name: 'Server Members', value: `${memberCount}`, inline: true})
        .addFields({name: 'Roles', value: `${roles}`, inline: true})
        .addFields({name: 'Emojis', value: `${emojis}`, inline: true})
        .addFields({name: 'Verification Level', value: `${baseVerification}`, inline: true})
        .addFields({name: 'Server Boosts', value: `${guild.premiumSubscriptionCount}`, inline: true})

        await interaction.reply({embeds: [embed] })
    }
}