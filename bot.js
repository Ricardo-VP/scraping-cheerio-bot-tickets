import { Telegraf } from 'telegraf'
import dotenv from 'dotenv'

dotenv.config()

export const Bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)

Bot.start((ctx) => {
    ctx.reply('Bienvenido, te avisaré cuando estén disponibles los tickets ❤️')

    const userName = `${ctx.message.from.first_name } ${ctx.message.from.last_name }`
    console.log(`INFO (JOINED)       ----> El usuario <${userName}> ha ingresado`)
})
