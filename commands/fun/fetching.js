const {
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
    ReactionUserManager,
  } = require("discord.js");
  const { Configuration, OpenAIApi } = require("openai");
  require("dotenv").config();
  const { execSync } = require("child_process");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("fetch")
      .setDescription("fetch from an api")
      .addStringOption((option) =>
        option.setName("string").setDescription("What would you like to say")
      ),
  
    async execute(interaction) {
      const str = interaction.options.getString("string");
  
      // Acknowledge the command and provide an initial response
      await interaction.deferReply({ ephemeral: true });
      await interaction.editReply("Processing your request...");
  
      const configuration = new Configuration({
        apiKey: process.env.API_KEY,
      });
  
      const openai = new OpenAIApi(configuration);
  
      let messages = [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello world" },
      ];
  
      messages.push({ role: "user", content: str });
  
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
  
      const result = completion.data.choices[0].message.content;
  
      // Perform additional processing if needed
      // ...
  
      // Provide the final result as an update to the initial response
      await interaction.editReply(`Processing completed!\nDemand: ${str}\nResult: ${result}`);
    },
  };
  