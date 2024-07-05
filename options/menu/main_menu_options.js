export const mainMenuOptions = async lang => {
	try {
		return {
			reply_markup: JSON.stringify({
				inline_keyboard: [
					[
						{
							text: `${lang === 'ru' ? `▶️Начать игру` : `▶️Start the game`}`,
							callback_data: '/game',
						},
					],
					[
						{
							text: `${lang === 'ru' ? `📢Задания` : `📢Tasks`}`,
							callback_data: '/tasks',
						},
					],
					[
						{
							text: `${lang === 'ru' ? `🛒Магазин` : `🛒Shop`}`,
							callback_data: '/shop',
						},
						{
							text: `${lang === 'ru' ? `🎁Инвентарь` : `🎁Inventory`}`,
							callback_data: '/inventory',
						},
					],
					[
						{
							text: `${lang === 'ru' ? `📝Статистика` : `📝Statistics`}`,
							callback_data: '/info',
						},
						{
							text: `${lang === 'ru' ? `🫡Рефералы` : `🫡Referrals`}`,
							callback_data: '/ref',
						},
					],
					[
						{
							text: `${lang === 'ru' ? `💸Кошелек` : `💸Wallet`}`,
							callback_data: '/wallet',
						},
						{
							text: `${lang === 'ru' ? `🏴‍☠️Язык` : `🏴‍☠️Language`}`,
							callback_data: '/lang',
						},
					],
				],
			}),
		}
	} catch (error) {
		console.log(error)
	}
}
