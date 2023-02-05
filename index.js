import { runScraper } from './scraping.js'
import { Bot } from './bot.js'

const suscriptions = new Map()

Bot.command('suscribirmexd', async (ctx) => {
  const userId = ctx.message.from.id
  const userName = `${ctx.message.from.first_name } ${ctx.message.from.last_name }`

  if (suscriptions.has(userId)) {
    ctx.reply('Ya estás suscripto para recibir mensajes sobre los tickets.')
    return
  }

  const interval = setInterval(async function () {
    const { message, status } = await runScraper()

    if (status === 'success') {
      ctx.reply(message)
      console.log(`INFO (SUCESS)       ----> El usuario <${userName}> ha sido alertado`)
    }
  }, 30000)

  suscriptions.set(userId, interval)
  ctx.reply('Te avisaré cuando los tickets estén disponibles! ❤️')
  console.log(`INFO (+1 SUB)       ----> El usuario <${userName}> se ha suscrito`)
})

Bot.command('stop', (ctx) => {
  const userId = ctx.message.from.id
  const userName = `${ctx.message.from.first_name } ${ctx.message.from.last_name }`

  if (!suscriptions.has(userId)) {
    ctx.reply('No estás suscripto para recibir mensajes sobre los tickets.')
    return
  }

  clearInterval(suscriptions.get(userId))
  suscriptions.delete(userId)

  ctx.reply('Ya no se te enviarán más mensajes sobre los tickets 😢')
  console.log(`INFO (-1 SUB)       ----> El usuario <${userName}> se ha desuscrito`)
})

Bot.launch()
