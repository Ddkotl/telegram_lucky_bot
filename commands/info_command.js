import { bot } from "../bot.js";
import { goToMainMenuOptions } from "../options/menu/index.js";

export const infoCommand = async (chatId, user) => {
  try {
    return await bot.sendMessage(
      chatId,
      `
			Cтатистика:\n\n💎Имя: ${user.first_name} ${user.username}\n💎Всего игр: ${
        user.wrong + user.right
      }\n💎Побед: ${user.right}\n💎Неудач ${user.wrong}\n💎Баланс : ${
        user.LUCK
      } ${process.env.COIN_NAME}`,
      { parse_mode: "HTML", ...(await goToMainMenuOptions(user.lang)) },
    );
  } catch (error) {
    console.log(error);
  }
};
