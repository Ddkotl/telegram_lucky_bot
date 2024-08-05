export const mainMenuMessage = async (user) => {
  if (user.lang === "ru") {
    return `
	💎<b>Привет ${user.first_name} ${user.username}, проверь свою удачу🍀!</b>💎\n\n💎Ожидается большой аирдроп 🚀 ${process.env.COIN_NAME}\n\n💎${process.env.COIN_NAME} — это новый токен на TON с реальным применением. Монета станет главным игровым ресурсом в будущей экосистеме LUCK, а добывать ее можно уже сейчас.\n\n💎Хотите получить еще больше ${process.env.COIN_NAME}? Просто поделитесь этим ботом со своими друзьями! Как только друг присоединится,вы и он получите приветственный бонус - ${process.env.COIN_FOR_REFERAL} монет ${process.env.COIN_NAME}!\n\n💎Ваш баланс: ${user.LUCK} ${process.env.COIN_NAME}💰\n\n💎Количество рефералов: ${user.referals}\n\n💎Увеличить удачу можно разными способами:\n✅Сыграть в игру\n✅Выполнить задания\n✅Купить ларцы и амулеты в магазине\n✅Приглашать друзей
	`;
  } else {
    return `
	💎<b>Hey ${user.first_name} ${user.username}, try your luck🍀!</b>💎\n\n💎Big airdrop expected 🚀 ${process.env.COIN_NAME}\n\n💎 ${process.env.COIN_NAME} is a new TON token with real world applications. The coin will become the main gaming resource in the future LUCK ecosystem, and you can watch it now.\n\n💎Do you want to get even more ${process.env.COIN_NAME}? I just passed this bot with my friends! As soon as a friend joins, you and he will receive a welcome bonus - ${process.env.COIN_FOR_REFERAL} ${process.env.COIN_NAME} coins!\n\n💎Your balance: ${user.LUCK} ${process.env.COIN_NAME}💰\n\n 💎Number of referrals: ${user.referals}\n\n💎You can increase your luck in different ways:\n ✅Play the game\n ✅Complete the task\n ✅Buy caskets and amulets in the store\n ✅Invite friends
	`;
  }
};
