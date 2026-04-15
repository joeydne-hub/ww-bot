const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const express = require("express");
require("dotenv").config();

// --- keep alive server (needed for Render) ---
const app = express();
app.get("/", (req, res) => res.send("DirectFeed bot is running"));
app.listen(process.env.PORT || 3000, () => {
  console.log("Web server running");
});

// --- discord bot ---
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

// load commands
const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log(`Bot online as ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  await command.execute(interaction);
});

client.login(process.env.TOKEN);
