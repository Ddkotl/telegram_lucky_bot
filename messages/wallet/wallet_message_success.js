export const walletMessageSuccess = async (user) =>{
    if(user.lang === 'ru'){
        return  `✅Вы успешно привязали кошелек`
    }else{
        return `✅You have successfully linked your wallet`
    }
}