const {SlashCommandBuilder, SlashCommandStringOption} = require('discord.js')
const {request} = require('undici')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fetch')
        .setDescription('link to fetch from')
        .addStringOption((option) =>
            option
                .setName('link')
                .setDescription('the link you will be fetching from')),

    async execute(interaction) {
        link = interaction.options.getString('link')
        link = 'https://pokeapi.co/api/v2/pokemon/ditto'
        let fetchResult = await request(link)
        fetchResult = await fetchResult.body.json()
        console.log(fetchResult)
        return interaction.reply('done')
    }
}