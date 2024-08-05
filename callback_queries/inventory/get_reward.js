import { bot } from "../../bot.js";
import { updateDateGetReward } from "../../db_querys/reward/index.js";
import { getRewardFromBoxes } from "../../functions.js";
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
      let boxesReward = await getRewardFromBoxes(userReward);
      await updateDateGetReward(user, boxesReward);
      await bot.deleteMessage(chatId, msg.message.message_id);
      return await bot.sendMessage(
        chatId,
        await successGetRewardMessage(user.lang, boxesReward),
        {
          parse_mode: "HTML",
          ...(await backToInventoryOptions(user.lang)),
        },
      );
    }
  }
};
