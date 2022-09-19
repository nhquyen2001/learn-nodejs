import express from 'express'
import configViewEngine from './configs/viewEngine'
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080

configViewEngine(app)

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.get('/about', (req, res) => {
  res.send('I\'m Quyen!')
})

app.listen(port, () => {
  console.log(`Example app listening at  http://localhost:${port}`)
})