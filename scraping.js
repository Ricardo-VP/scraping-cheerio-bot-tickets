import axios from 'axios'
import cheerio from 'cheerio'

const url = 'https://classmusic.com.mx/giallo-fantastique-tour'

async function getHTML() {
  const { data: html } = await axios.get(url)
  return html
}

const options = {
  date: '16 de abril',
  location: 'Ecuador',
  defaultStatus: 'próximamente',
}

const selectors = {
  prefix: {
    elements:
      'div.elementor-container.elementor-column-gap-default div.elementor-row div.elementor-column-wrap div.elementor-widget-wrap div.elementor-element div.elementor-widget-container',
    row: 'div.elementor-row',
  },
  locations: 'h2.elementor-heading-title',
  status:
    'div.elementor-button-wrapper a span.elementor-button-content-wrapper span.elementor-button-text',
}

export async function runScraper() {
  return await getHTML().then((res) => {
    const $ = cheerio.load(res)
    const shows = $(selectors.prefix.elements)

    let response = {
      message: '',
      status: 'pending'
    }
    
    shows.each((i, show) => {
      const locations = $(show).find(selectors.locations)

      $(locations).each((_, location) => {
        if (
          $(location).children().length === 0 &&
          $(location).text().includes(options.location)
        ) {
          const _location = $(location).text()
          const _status = $(location)
            .closest(selectors.prefix.row)
            .find(selectors.status)
            .text()


          if (_status === options.defaultStatus) {
            response.message += `Localidad: ${_location}\n`
            response.message += `Estado: ${_status}\n`
          } else {
            response.message += 'ALERTA ALERTA ALERTA ALERTA ALERTA ALERTA ALERTA\n'
            response.message += `Estado: ${_status}\n`
            response.status = 'success'
          }
        }
      })
    })

    let today = new Date();
    let date = `${today.getFullYear()}-${(today.getMonth()+1)}-${today.getDate()}`
    let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    let dateTime = `${date} ${time}`;

    console.info(`INFO (SCRAPER)      ----> Scraping realizado: ${dateTime}`)

    return response
  })
}
