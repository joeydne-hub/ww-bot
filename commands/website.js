const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("website")
    .setDescription("DirectFeed website link"),

  async execute(interaction) {
    await interaction.reply(
      "our website is accessible copy-allowed{directfeedorg.org}"
    );
  },
};
