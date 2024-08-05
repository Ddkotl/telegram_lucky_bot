import { bot } from "../../bot.js";
import { createUserReward } from "../../db_querys/reward/create.js";
import { createUserTask } from "../../db_querys/task/create.js";
import {
  createUser,
  updateReferedUser,
  updateRefererUser,
} from "../../db_querys/user/index.js";
import { registerMessage } from "../../messages/user/index.js";
import { goToMainMenuOptions } from "../../options/menu/index.js";

export const createUserActions = async (
  chatId,
  username,
  firstname,
  lang,
  text,
) => {
  const user = await createUser(chatId, username, firstname, lang);
  if (text.startsWith("/start") && text.length > 6 && user.refered === false) {
    const refID = text.slice(7);
    const isRefererUserUpdate = await updateRefererUser(refID);
    if (isRefererUserUpdate) {
      await updateReferedUser(user);
    }
  }
  await createUserReward(user.id);
  await createUserTask(user.id);
  return await bot.sendMessage(chatId, await registerMessage(lang), {
    parse_mode: "HTML",
    ...(await goToMainMenuOptions(lang)),
  });
};
