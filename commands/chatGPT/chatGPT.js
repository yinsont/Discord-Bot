const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

// Array to store the history of responses
const responseHistory = [];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chatgpt")
    .setDescription("State your demands to our lord")
    .addStringOption((option) =>
      option
        .setName("demand")
        .setDescription("What would you like our lord and savior to do?")
    ),

  async execute(interaction) {
    const str = interaction.options.getString("demand");

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

    messages.push({ role: "user", content: str });

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const result = completion.data.choices[0].message.content;

    // Store the response in the history array
    responseHistory.push(result);

    // Perform additional processing if needed
    // ...

    // Provide the final result as an update to the initial response
    await interaction.editReply(
      `Processing completed!\n\nDemand: ${str}\n\nResult:\n${result}`
    );
  },
};
