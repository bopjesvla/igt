import express from 'express'
import config from '../config'

var port = process.env.PORT || config.dev.port

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
}
