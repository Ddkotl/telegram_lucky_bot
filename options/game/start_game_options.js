export const startGameOptions = async lang => {
	return {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[
					{
						text: `${lang === 'ru' ? `▶️Начать игру` : `▶️Start game`}`,
						callback_data: '/game',
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
