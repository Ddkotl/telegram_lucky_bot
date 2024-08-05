import { bot } from "../../bot.js";
import { shopMessage } from "../../messages/shop/shop_message.js";
import { shopOptions } from "../../options/shop/index.js";

export const shop = async (data, msg, chatId, user) => {
  if (data === "/shop") {
    await bot.deleteMessage(chatId, msg.message.message_id);
    return await bot.sendMessage(chatId, await shopMessage(user.lang), {
      parse_mode: "HTML",
      ...(await shopOptions(user.lang)),
    });
  }
};
