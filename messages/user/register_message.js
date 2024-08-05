export const registerMessage = async (lang) => {
  if (lang === "ru") {
    return "🥳Вы успешно зарегистрировались,нажмите /start или кнопку ниже для начала 🫡";
  } else {
    return "🥳You have successfully registered, click /start or the button below to start🫡";
  }
};
