import 'dotenv/config' 
export const taskInstructionMessage = async (lang)=>{
    if(lang === 'ru'){
        return  `Подпишись на канал ${process.env.TASK1}.\nНажми на кнопку проверить.\nВ случае успешной проверки на подписку ты получишь ${process.env.COIN_FOR_TASK} ${process.env.COIN_NAME}`
    }else{
        return `Subscribe to the channel ${process.env.TASK1}.\nClick on the check button.\nIf the subscription check is successful, you will receive ${process.env.COIN_FOR_TASK} ${process.env.COIN_NAME}`
    }
}