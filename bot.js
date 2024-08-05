import "dotenv/config";

import TelegramBot from "node-telegram-bot-api";

export const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
bot.on("polling_error", (err) => {
  console.log(err.data.message);
});
