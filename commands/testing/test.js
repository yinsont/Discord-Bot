const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("What would you like the bot to say?")
    .addStringOption((option) =>
      option
        .setName("message1")
        .setDescription("First message")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message2")
        .setDescription("Second message")
        .setRequired(true)
    ),

  async execute(interaction) {
    const str1 = interaction.options.getString("message1");
    const str2 = interaction.options.getString("message2");
    console.log(str1 + str2);
    return interaction.reply({
      content: "An attempt was made",
      ephemeral: true,
    });
  },
};
