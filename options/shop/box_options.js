export const boxOptions = async lang => {
	return {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[
					{
						text: `${
							lang === 'ru' ? `Купить старый сундук` : `Buy an old chest`
						}`,
						callback_data: '/smallBox',
					},
				],
				[
					{
						text: `${
							lang === 'ru' ? `Купить роскошный сундук` : `Buy a luxury chest`
						}`,
						callback_data: '/middleBox',
					},
				],
				[
					{
						text: `${
							lang === 'ru'
								? `Купить таинственый сундук`
								: `Buy a mysterious chest`
						}`,
						callback_data: '/largeBox',
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
