import { bot } from "../bot.js";
import { notUnderstandMessage } from "../messages/not_understand_message.js";
import { goToMainMenuOptions } from "../options/menu/index.js";

export const notUnderstandCommand = async (chatId, user) => {
  try {
    return await bot.sendMessage(chatId, await notUnderstandMessage(user), {
      parse_mode: "HTML",
      ...(await goToMainMenuOptions(user.lang)),
    });
  } catch (error) {
    console.log(error);
  }
};
