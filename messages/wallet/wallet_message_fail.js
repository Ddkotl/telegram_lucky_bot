export const walletMessageFail = async (user) =>{
    if(user.lang === 'ru'){
        return  `❌Адрес должен начинаться с UQ и содержать 48 символов`
    }else{
        return `❌The address must start with UQ and contain 48 characters`
    }
}