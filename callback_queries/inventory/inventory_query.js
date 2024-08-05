import { getReward } from "./get_reward.js";
import { inventory } from "./inventory.js";

export const inventoryQuery = async (data, user, chatId, msg, userReward) => {
  await inventory(data, user, chatId, msg, userReward);
  await getReward(data, user, chatId, msg, userReward);
};
