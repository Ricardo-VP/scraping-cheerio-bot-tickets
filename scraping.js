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
    'div.elementor-button-wrapper a.elementor-button span.elementor-button-content-wrapper span.elementor-button-text',
}

export function runScraper() {
  getHTML().then((res) => {
    const $ = cheerio.load(res)
    const shows = $(selectors.prefix.elements)

    shows.each((i, show) => {
      const locations = $(show).find(selectors.locations)

      $(locations).each((i, location) => {
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
            console.log('-------------------------------------------------')
            console.log(`Localidad: ${_location}`)
            console.log(`Estado: ${_status}`)
            console.log('-------------------------------------------------')
          } else {
            console.log('-------------------------------------------------')
            console.log('ALERTA ALERTA ALERTA ALERTA ALERTA ALERTA ALERTA ')
            console.log(`Estado: ${_status}`)
            console.log('ALERTA ALERTA ALERTA ALERTA ALERTA ALERTA ALERTA ')
            console.log('-------------------------------------------------')
          }
        }
      })
    })
  })
}
