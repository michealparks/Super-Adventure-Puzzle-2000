/**
 * Development server for phone testing
 */

'use strict'

const { join } = require('path')
const express = require('express')
const app = express()

app.use('/', express.static(join(__dirname, 'build')))

app.listen('2000', function () {
  console.log(`Server listening on port 2000`)
})
