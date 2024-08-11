import { bot } from "../../bot.js";
import { updateUserLose, updateUserWin } from "../../db_querys/user/index.js";
import {
  fullLoseMessage,
  loseMessage,
  playAgainMessage,
  winnerMessage,
} from "../../messages/game/index.js";
import { startGameOptions } from "../../options/game/index.js";
import { startGame } from "./start_game.js";

const chats = new Object();

export const game = async (data, msg, chatId, user) => {
  if (data === "/game") {
    await bot.deleteMessage(chatId, msg.message.message_id);
    return startGame(chatId, chats, user);
  }
  if (!data.startsWith("/") && data == chats[chatId]) {
    await updateUserWin(user);
    await bot.editMessageText(
      await winnerMessage(user, data),
      {
        chat_id: chatId,
        message_id: msg.message.message_id,
      },
      { parse_mode: "HTML" },
    );
  
    return await bot.sendMessage(
      chatId,
      await playAgainMessage(user.lang),
      await startGameOptions(user.lang),
    );
  } else if (!data.startsWith("/") && data !== chats[chatId]) {
    if (user.LUCK <= 0) {
      await updateUserLose(user);
      await bot.editMessageText(
        await fullLoseMessage(data, chats, chatId, user),
        {
          chat_id: chatId,
          message_id: msg.message.message_id,
        },
        { parse_mode: "HTML" },
      );
    } else {
      await updateUserLose(user);
      await bot.editMessageText(
        await loseMessage(data, chats, chatId, user),
        {
          chat_id: chatId,
          message_id: msg.message.message_id,
        },
        { parse_mode: "HTML" },
      );
    }
    return await bot.sendMessage(
      chatId,
      
      await playAgainMessage(user.lang),
      await startGameOptions(user.lang),
    );
  }
};
