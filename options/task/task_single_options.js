export const taskSingleOptions = async (lang) => {
  if (lang === "ru") {
    return {
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
    };
  } else {
    return {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            { text: "Back", callback_data: "/tasks" },
            {
              text: "♻️To main menu",
              callback_data: "/goToMainMenu",
            },
          ],
        ],
      }),
    };
  }
};
