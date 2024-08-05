import "dotenv/config";
import { bot } from "../bot.js";
import { mainMenuMessage } from "../messages/menu/index.js";
import { mainMenuOptions } from "../options/menu/index.js";

export async function startCommand(chatId, user) {
  try {
    return await bot.sendMessage(chatId, await mainMenuMessage(user), {
      parse_mode: "HTML",
      ...(await mainMenuOptions(user.lang)),
    });
  } catch (error) {
    console.log(error);
  }
}
