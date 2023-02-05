import { runScraper } from './scraping.js'

setInterval(function () {
  runScraper()
}, 60000)
