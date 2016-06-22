import express from 'express'
import api from './api' 
import config from '../config'

console.log("GDSFHT")
var port = process.env.PORT || config.dev.port

let app = express()

app.use("/api", api)

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
