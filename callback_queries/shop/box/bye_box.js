import "dotenv/config";
import { bot } from "../../../bot.js";
import {
  addLargeBoxByUserId,
  addMiddleBoxByUserId,
  addSmallBoxByUserId,
} from "../../../db_querys/reward/index.js";
import {
  failByeMessage,
  successByeMessage,
} from "../../../messages/shop/index.js";
import { backToBoxOptions } from "../../../options/shop/index.js";

export const byeBox = async (data, msg, chatId, user) => {
  const canUserByeSmallBox = user.LUCK >= process.env.SMALL_BOX_LUCK;
  const canUserByeMiddleBox = user.LUCK >= process.env.MIDDLE_BOX_LUCK;
  const canUserByeLargeBox = user.LUCK >= process.env.LARGE_BOX_LUCK;
  if (data === "/smallBox") {
    if (!canUserByeSmallBox) {
      await bot.deleteMessage(chatId, msg.message.message_id);
      return await bot.sendMessage(chatId, await failByeMessage(user.lang), {
        parse_mode: "HTML",
        ...(await backToBoxOptions(user.lang)),
      });
    } else {
      await bot.deleteMessage(chatId, msg.message.message_id);
      await addSmallBoxByUserId(user);
      return await bot.sendMessage(chatId, await successByeMessage(user.lang), {
        parse_mode: "HTML",
        ...(await backToBoxOptions(user.lang)),
      });
    }
  }
  if (data === "/middleBox") {
    if (!canUserByeMiddleBox) {
      await bot.deleteMessage(chatId, msg.message.message_id);
      return await bot.sendMessage(chatId, await failByeMessage(user.lang), {
        parse_mode: "HTML",
        ...(await backToBoxOptions(user.lang)),
      });
    } else {
      await bot.deleteMessage(chatId, msg.message.message_id);
      await addMiddleBoxByUserId(user);
      return await bot.sendMessage(chatId, await successByeMessage(user.lang), {
        parse_mode: "HTML",
        ...(await backToBoxOptions(user.lang)),
      });
    }
  }
  if (data === "/largeBox") {
    if (!canUserByeLargeBox) {
      await bot.deleteMessage(chatId, msg.message.message_id);
      return await bot.sendMessage(chatId, await failByeMessage(user.lang), {
        parse_mode: "HTML",
        ...(await backToBoxOptions(user.lang)),
      });
    } else {
      await bot.deleteMessage(chatId, msg.message.message_id);
      await addLargeBoxByUserId(user);
      return await bot.sendMessage(chatId, await successByeMessage(user.lang), {
        parse_mode: "HTML",
        ...(await backToBoxOptions(user.lang)),
      });
    }
  }
};
