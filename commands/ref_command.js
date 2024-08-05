import "dotenv/config";
import { bot } from "../bot.js";
import { goToMainMenuOptions } from "../options/menu/index.js";

export const refCommand = async (chatId, user) => {
  const bonus = user.referals * process.env.COIN_FOR_REFERAL;
  await bot.sendMessage(
    chatId,
    `
		💎За каждого приглашенного вы получите ${process.env.COIN_FOR_REFERAL} ${process.env.COIN_NAME}, а также уникальную возможность приобрести волшебные амулеты в магазине.\n💎Вы пригласили: ${user.referals} человек.\n💎Получено удачи за приглашенных: ${bonus} ${process.env.COIN_NAME}\n💎Ваша реферальная ссылка: <code>${process.env.URL_TO_BOT}?start=${user.id}</code>`,
    { parse_mode: "HTML", ...(await goToMainMenuOptions(user.lang)) },
  );
};
