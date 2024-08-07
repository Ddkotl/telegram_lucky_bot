import "dotenv/config";
export const refMessage = async (user) => {
  let bonus = user.referals * process.env.COIN_FOR_REFERAL;
  if (user.lang === "ru") {
    return `
		💎За каждого приглашенного вы получите ${process.env.COIN_FOR_REFERAL} ${process.env.COIN_NAME}, а также уникальную возможность приобрести волшебные амулеты в магазине.\n\n💎Вы пригласили: ${user.referals} человек.\n💎Получено удачи за приглашенных: ${bonus} ${process.env.COIN_NAME}\n\n💎Ваша реферальная ссылка: <code>${process.env.URL_TO_BOT}?start=${user.id}</code>`;
  } else {
    return `
		💎For each invitee you will receive ${process.env.COIN_FOR_REFERAL} ${process.env.COIN_NAME}, as well as a unique opportunity to purchase magic amulets in the store.\n\n💎You have invited: ${user.referals} people.\n💎 Good luck received for invitees: ${bonus} ${process.env.COIN_NAME}\n\n💎Your referral link: <code>${process.env.URL_TO_BOT}?start=${user.id}</code>`;
  }
};
