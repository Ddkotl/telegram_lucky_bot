export const notUnderstandMessage = async (user) => {
  if (user.lang === "ru") {
    return `🤯${user.first_name} ${user.username}, я тебя не понимаю, попробуй ввести запрос из меню `;
  } else {
    return `🤯${user.first_name} ${user.username}, I don’t understand you, try entering a query from the menu `;
  }
};
