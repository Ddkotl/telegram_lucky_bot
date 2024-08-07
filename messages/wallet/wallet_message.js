export const walletMessage = async (user) =>{
    if(user.lang === 'ru'){
        return  `💎Привяжите свой кошелек в сети $TON, на него будут отправляться награды и будущий аирдроп.\n\n💎Введите адрес вашего кошелька в формате /wallet=адрес \nПример - /wallet=UQCk...350N\n\n💎Адрес должен начинаться с UQ и содержать 48 символов \n\n ${user.tonWallet ? `💎Ваш кошелек <code>${user.tonWallet}</code>` :`💎В данный момент кошелек не привязан`} `
    }else{
        return `💎Link your wallet on the $TON network, rewards and future airdrops will be sent to it.\n\n💎Enter your wallet address in the format /wallet=address \nExample - /wallet=UQCk...350N\n\n💎 The address must start with UQ and contain 48 characters \n\n ${user.tonWallet ? `💎Your wallet <code>${user.tonWallet}</code>` :`💎The wallet is not linked at the moment`} `
    }
}