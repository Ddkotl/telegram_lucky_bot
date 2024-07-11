export const inventoryOptions = async lang => {
	return {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[
					{
						text: `${
							lang === 'ru' ? `Забрать награду` : `Collect your reward`
						}`,
						callback_data: '/getRewardForBox',
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
