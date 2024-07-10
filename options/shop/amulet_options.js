export const amuletOptions = async lang => {
	return {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[
					{
						text: `${
							lang === 'ru'
								? `Получить бронзовый талисман`
								: `Receive bronze talisman`
						}`,
						callback_data: '/bronzeAmulet',
					},
				],
				[
					{
						text: `${
							lang === 'ru'
								? `Получить серебряный талисман`
								: `Receive silver talisman`
						}`,
						callback_data: '/silverAmulet',
					},
				],
				[
					{
						text: `${
							lang === 'ru'
								? `Получить золотой талисман`
								: `Receive golden talisman`
						}`,
						callback_data: '/goldAmulet',
					},
				],
				[
					{
						text: `${
							lang === 'ru'
								? `Получить бриллиантовый талисман`
								: `Receive diamond talisman`
						}`,
						callback_data: '/diamondAmulet',
					},
				],
				[
					{
						text: `${lang === 'ru' ? `Назад` : `Back`}`,
						callback_data: '/shop',
					},
					{
						text: `${lang === 'ru' ? `♻️В главное меню` : `♻️To main menu`}`,
						callback_data: '/goToMainMenu',
					},
				],
			],
		}),
	}
}
