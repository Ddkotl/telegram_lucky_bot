export const backToInventoryOptions = async lang => {
	return {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[
					{
						text: `${lang === 'ru' ? `Назад` : `Back`}`,
						callback_data: '/inventory',
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
