export const taskCheckOptions = async (lang) => {
  if (lang === "ru") {
    return {
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
    };
  } else {
    return {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Go", url: process.env.TASK1 }],
          [{ text: "Check", callback_data: "/checkTask1" }],
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
