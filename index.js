const cron = require('node-cron')
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

const yau = cron.schedule('* * * * * *', () => {
  console.log(`${new Date().toLocaleString()} >> CRON running`)
}, {
  timezone
})

const cronverter = time => {
  let [h, m] = time.split(':').map(Number)
  if (!h) h = '*'
  else h = `*/${h}`
  if (!m) m = '*'
  else m = `*/${m}`
  const cron = `${m} ${h} * * *`
  return cron
}

const chartATime = '0:1'
const chartA = cron.schedule(cronverter(chartATime), () => {
  console.log(`\n${new Date().toLocaleString()} >> Chart A updated\n`)
}, {
  scheduled: false,
  timezone
})

const chartBTime = '0:2'
const chartB = cron.schedule(cronverter(chartBTime), () => {
  console.log(`\n${new Date().toLocaleString()} >> Chart B updated\n`)
}, {
  scheduled: false,
  timezone
})

chartA.start()
chartB.start()

process.on('SIGINT', () => {
  console.log(`${new Date().toLocaleString()} >> Exiting cron...`)
  yau.stop().destroy()
  chartA.stop().destroy()
  chartB.stop().destroy()
  setTimeout(() => {
    process.exit(0)
  }, 500)
})
