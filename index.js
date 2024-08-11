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
import {
  walletMessage,
  walletMessageFail,
  walletMessageSuccess,
} from "./messages/wallet/index.js";

import {
  taskCompleteMessage,
  taskInstructionMessage,
  taskMessage,
  taskSuccessMessage,
} from "./messages/task/index.js";
import {
  taskOptions,
  taskCheckOptions,
  taskSingleOptions,
} from "./options/task/index.js";

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
        if (wallet.startsWith("UQ") && wallet.length == 48) {
          await updateWallet(user.id, wallet);
          return await bot.sendMessage(
            chatId,
            await walletMessageSuccess(user.lang),
            {
              parse_mode: "HTML",
              ...(await goToMainMenuOptions(user.lang)),
            },
          );
        } else {
          return await bot.sendMessage(
            chatId,
            await walletMessageFail(user.lang),
            {
              parse_mode: "HTML",
              ...(await goToMainMenuOptions(user.lang)),
            },
          );
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
        return await bot.sendMessage(chatId, await taskMessage(user.lang), {
          parse_mode: "HTML",
          ...(await taskOptions(user.lang, userTask)),
        });
      }
      if (data === "/task1") {
        await bot.deleteMessage(chatId, msg.message.message_id);
        if (userTask.task1) {
          return await bot.sendMessage(
            chatId,
            await taskSuccessMessage(user.lang),
            {
              parse_mode: "HTML",
              ...(await taskSingleOptions(user.lang)),
            },
          );
        } else {
          return await bot.sendMessage(
            chatId,
            await taskInstructionMessage(user.lang),
            {
              parse_mode: "HTML",
              ...(await taskCheckOptions(user.lang)),
            },
          );
        }
      }
      if (data === "/checkTask1") {
        const pass = await bot.getChatMember("@LuckyDropGame", chatId);
        if (pass.status === "left") {
          return await bot.sendMessage(
            chatId,
            await taskNoCompleteMessage(user.lang),
          );
        } else {
          await completeTask1(user);
          await bot.deleteMessage(chatId, msg.message.message_id);
          return await bot.sendMessage(
            chatId,
            await taskCompleteMessage(user.lang),
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
