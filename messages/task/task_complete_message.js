import 'dotenv/config'
export const taskCompleteMessage = async (lang)=>{
    if(lang === 'ru'){
        return `✅Вы успешно получили ${process.env.COIN_FOR_TASK} ${process.env.COIN_NAME}`
    }else{
        return `✅You have successfully received ${process.env.COIN_FOR_TASK} ${process.env.COIN_NAME}`
    }
}