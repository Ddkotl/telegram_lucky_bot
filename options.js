export const connectWalletOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "Подключить кошелек", callback_data: "/connectWallet" },
        { text: "♻️В главное меню", callback_data: "/goToMainMenu" },
      ],
    ],
  }),
};
export const saveWalletOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "Сохранить", callback_data: "/saveWallet" },
        { text: "♻️В главное меню", callback_data: "/goToMainMenu" },
      ],
    ],
  }),
};
