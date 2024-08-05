export const goToMainMenuOptions = async (lang) => {
  try {
    return {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {
              text: `${lang === "ru" ? `♻️В главное меню` : `♻️To main menu`}`,
              callback_data: "/goToMainMenu",
            },
          ],
        ],
      }),
    };
  } catch (error) {
    console.log(error);
  }
};
