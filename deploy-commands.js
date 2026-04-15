const { REST, Routes } = require("discord.js");
require("dotenv").config();

const commands = [
  {
    name: "website",
    description: "DirectFeed website link",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Deploying slash commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Commands deployed!");
  } catch (err) {
    console.error(err);
  }
})();
