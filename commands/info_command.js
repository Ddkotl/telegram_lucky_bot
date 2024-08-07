import { bot } from "../bot.js";
import { StatisticMessage } from "../messages/statistic/index.js";
import { goToMainMenuOptions } from "../options/menu/index.js";

export const infoCommand = async (chatId, user) => {
  try {
    return await bot.sendMessage(
      chatId,
      await StatisticMessage(user),
      { parse_mode: "HTML", ...(await goToMainMenuOptions(user.lang)) },
    );
  } catch (error) {
    console.log(error);
  }
};
