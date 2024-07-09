export const shopOptions = async lang => {
	return {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[
					{
						text: `${lang === 'ru' ? `Сундуки с удачей` : `Chests with luck`}`,
						callback_data: '/box',
					},
					{
						text: `${
							lang === 'ru' ? `Волшебные талисманы` : `Magic talismans`
						}`,
						callback_data: '/amulet',
					},
				],

				[
					{
						text: `${lang === 'ru' ? `♻️В главное меню` : `♻️To main menu`}`,
						callback_data: '/goToMainMenu',
					},
				],
			],
		}),
	}
}
