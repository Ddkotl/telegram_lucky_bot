import { bot } from "../../../bot.js";
import { boxMessage } from "../../../messages/shop/index.js";
import { boxOptions } from "../../../options/shop/index.js";

export const box = async (data, msg, chatId, user) => {
  if (data === "/box") {
    await bot.deleteMessage(chatId, msg.message.message_id);
    return await bot.sendMessage(chatId, await boxMessage(user), {
      parse_mode: "HTML",
      ...(await boxOptions(user.lang)),
    });
  }
};
