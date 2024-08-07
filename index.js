import "dotenv/config";
import { bot } from "./bot.js";
import {
  infoCommand,
  notUnderstandCommand,
  refCommand,
  setMyCommands,
  startCommand,
} from "./commands/index.js";

import { createUserActions } from "./actions/user/index.js";
import {
  game,
  inventoryQuery,
  langQuery,
  shopQuery,
} from "./callback_queries/index.js";
import { findRewardInfoByUserID } from "./db_querys/reward/index.js";
import { completeTask1, findTaskInfoByUserID } from "./db_querys/task/index.js";
import { findUserByChatId, updateWallet } from "./db_querys/user/index.js";
import { goToMainMenuOptions } from "./options/menu/go_to_main_menu.js";
import { walletMessage, walletMessageFail, walletMessageSuccess } from "./messages/wallet/index.js";

const startApp = async () => {
  setMyCommands();
  bot.on("message", async (msg) => {
    try {
      const chatId = msg.chat.id;
      const username = msg.chat.username;
      const firstname = msg.chat.first_name;
      const text = msg.text;
      const lang = msg.from.language_code;
      const user = await findUserByChatId(chatId);
      if (!user) {
        return await createUserActions(chatId, username, firstname, lang, text);
      }
      if (text === "/start") {
        return await startCommand(chatId, user);
      }
      if (text.startsWith("/wallet") && text.length > 7) {
        const wallet = text.slice(8);
        if(wallet.startsWith('UQ') && wallet.length == 48){
          await updateWallet(user.id , wallet)
          return await bot.sendMessage(chatId, await walletMessageSuccess(user.lang), {
            parse_mode: "HTML",
            ...(await goToMainMenuOptions(user.lang)),
          });
        }else{
          return await bot.sendMessage(chatId, await walletMessageFail(user.lang), {
            parse_mode: "HTML",
            ...(await goToMainMenuOptions(user.lang)),
          }); 
        }
      }
      return await notUnderstandCommand(chatId, user);
    } catch (error) {
      console.log(error);
    }
  });
  bot.on("callback_query", async (msg) => {
    try {
      const data = msg.data;
      const chatId = msg.message.chat.id;
      const user = await findUserByChatId(chatId);
      const userReward = await findRewardInfoByUserID(user.id);
      const userTask = await findTaskInfoByUserID(user.id);

      await game(data, msg, chatId, user);
      await shopQuery(data, msg, chatId, user, userReward);
      await langQuery(data, chatId, msg, user);
      await inventoryQuery(data, user, chatId, msg, userReward);

      if (data === "/goToMainMenu") {
        await bot.deleteMessage(chatId, msg.message.message_id);
        return await startCommand(chatId, user);
      }
      if (data === "/info") {
        await bot.deleteMessage(chatId, msg.message.message_id);
        return await infoCommand(chatId, user);
      }
      if (data === "/ref") {
        await bot.deleteMessage(chatId, msg.message.message_id);
        return await refCommand(chatId, user);
      }
      if (data === "/tasks") {
        await bot.deleteMessage(chatId, msg.message.message_id);
        return await bot.sendMessage(
          chatId,
          `❇️ Активные задания\n✅ Выполненные задания\n\nВыполняйте задания - зарабатывайте ${process.env.COIN_NAME}!\nВсё очень просто.\nВы получите по ${process.env.COIN_FOR_TASK} ${process.env.COIN_NAME} за выполнение задания`,
          {
            parse_mode: "HTML",
            reply_markup: JSON.stringify({
              inline_keyboard: [
                [
                  {
                    text: `${
                      userTask.task1 ? "✅" : "❇️"
                    }Подпишись на канал проекта ${process.env.COIN_NAME}`,
                    callback_data: "/task1",
                  },
                ],
              ],
            }),
          },
        );
      }
      if (data === "/task1") {
        await bot.deleteMessage(chatId, msg.message.message_id);
        if (userTask.task1) {
          return await bot.sendMessage(
            chatId,
            `✅Вы уже выполнили эту задачу`,
            {
              parse_mode: "HTML",
              reply_markup: JSON.stringify({
                inline_keyboard: [
                  [
                    { text: "Назад", callback_data: "/tasks" },
                    {
                      text: "♻️В главное меню",
                      callback_data: "/goToMainMenu",
                    },
                  ],
                ],
              }),
            },
          );
        } else {
          return await bot.sendMessage(
            chatId,
            `Подпишись на канал ${process.env.TASK1}.\nНажми на кнопку проверить.\nВ случае успешной проверки на подписку ты получишь ${process.env.COIN_FOR_TASK} ${process.env.COIN_NAME}`,
            {
              parse_mode: "HTML",
              reply_markup: JSON.stringify({
                inline_keyboard: [
                  [{ text: "Перейти", url: process.env.TASK1 }],
                  [{ text: "Проверить", callback_data: "/checkTask1" }],
                  [
                    { text: "Назад", callback_data: "/tasks" },
                    {
                      text: "♻️В главное меню",
                      callback_data: "/goToMainMenu",
                    },
                  ],
                ],
              }),
            },
          );
        }
      }
      if (data === "/checkTask1") {
        const pass = await bot.getChatMember("@LuckyDropGame", chatId);
        if (pass.status === "left") {
          return await bot.sendMessage(
            chatId,
            "❌Вы не подписались на канал проекта",
          );
        } else {
          await completeTask1(user);
          return await bot.sendMessage(
            chatId,
            `✅Вы успешно получили ${process.env.COIN_FOR_TASK} ${process.env.COIN_NAME}`,
          );
        }
      }
      if (data === "/wallet") {
        await bot.deleteMessage(chatId, msg.message.message_id);
        return await bot.sendMessage(chatId, await walletMessage(user), {
          parse_mode: "HTML",
          ...(await goToMainMenuOptions(user.lang)),
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

startApp();
