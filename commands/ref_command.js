import { bot } from "../bot.js";
import { goToMainMenuOptions } from "../options/menu/index.js";
import { refMessage } from "../messages/ref/index.js";

export const refCommand = async (chatId, user) => {
  let bonus = user.referals * process.env.COIN_FOR_REFERAL;
  await bot.sendMessage(chatId, await refMessage(user), {
    parse_mode: "HTML",
    ...(await goToMainMenuOptions(user.lang)),
  });
};
