# discord_bot

![CI tests](https://github.com/SileNce5k/discord_bot/actions/workflows/CI.yml/badge.svg)


A modular discord bot written in javascript, using the [discord.js](https://discord.js.org) library.

This is my second attempt at making a discord bot.

The bot can be quite buggy at times, so be warned before trying it out.

---

To use the bot:

```text
git clone https://github.com/SileNce5k/discord_bot.git
cd discord_bot
npm install
npm start
```

The first time you start the bot with `npm start`, it will create a directory called data with a config.json file.  
In this file, enter your bot token.  
You can also enter a login message, channel and enable it.  
You can also change the global prefix.  
You should enter you discord user id, so you can use the admin commands.
Every time you want to change something in this file, you have to restart the bot.  

If the config is ever changed, you need to either delete it and repeat the steps above or take a look at the util/createInitialConfig.js file.


## Known issues

See [issues](https://github.com/SileNce5k/discord_bot/issues?q=is%3Aopen+is%3Aissue+label%3Abug)
