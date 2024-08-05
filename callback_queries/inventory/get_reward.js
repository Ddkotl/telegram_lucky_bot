import { bot } from "../../bot.js";
import { updateDateGetReward } from "../../db_querys/reward/index.js";
import {
  backToInventoryOptions,
  rewardAlreadeGetMessage,
  successGetRewardMessage,
} from "../../options/inventory/index.js";

export const getReward = async (data, user, chatId, msg, userReward) => {
  if (data === "/getRewardForBox") {
    const getYear = userReward.getReward.getFullYear();
    const getMonth = userReward.getReward.getMonth();
    const getDate = userReward.getReward.getDate();
    const currentDate = new Date();
    if (
      currentDate.getFullYear() === getYear &&
      currentDate.getMonth() === getMonth &&
      currentDate.getDate() === getDate
    ) {
      await bot.deleteMessage(chatId, msg.message.message_id);
      return await bot.sendMessage(
        chatId,
        await rewardAlreadeGetMessage(user.lang),
        { parse_mode: "HTML", ...(await backToInventoryOptions(user.lang)) },
      );
    } else {
      // await getRewardFromBoxes(user.id)
      await updateDateGetReward(user.id);
      await bot.deleteMessage(chatId, msg.message.message_id);
      return await bot.sendMessage(
        chatId,
        await successGetRewardMessage(user.lang),
        {
          parse_mode: "HTML",
          ...(await backToInventoryOptions(user.lang)),
        },
      );
    }
  }
};
