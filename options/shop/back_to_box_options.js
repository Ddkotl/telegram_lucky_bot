export const backToBoxOptions = async (lang) => {
  return {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: `${lang === "ru" ? `Назад` : `Back`}`,
            callback_data: "/box",
          },
          {
            text: `${lang === "ru" ? `♻️В главное меню` : `♻️To main menu`}`,
            callback_data: "/goToMainMenu",
          },
        ],
      ],
    }),
  };
};
