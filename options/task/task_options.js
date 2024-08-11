export const taskOptions = async (lang, userTask) => {
  if (lang === "ru") {
    return {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {
              text: `${
                userTask.task1 ? "✅" : "❇️"
              } Подпишись на канал проекта ${process.env.COIN_NAME}`,
              callback_data: "/task1",
            },
            {
              text: `♻️В главное меню`,
              callback_data: "/goToMainMenu",
            },
          ],
        ],
      }),
    };
  } else {
    return {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {
              text: `${
                userTask.task1 ? "✅" : "❇️"
              }Subscribe to the project channel ${process.env.COIN_NAME}`,
              callback_data: "/task1",
            },
          ],
          [
            {
              text: `♻️To main menu`,
              callback_data: "/goToMainMenu",
            },
          ],
        ],
      }),
    };
  }
};
