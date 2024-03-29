/**
 * A simple task for copying the default html file
 * and inlining crucial CCS and JS
 */

'use strict'

const fs = require('fs')
const r = require('path').resolve
const inline = require('inline-source')
const root = __dirname
const dev = process.env.NODE_ENV === 'development'

function copyIndexFile () {
  const source = fs.createReadStream(r(root, 'app/index.html'))
  source.pipe(fs.createWriteStream(r(root, 'build/index.html')))
  source.on('error', console.error.bind(console))
  return source.on('end', dev ? function () {} : onStreamEnd)
}

function onStreamEnd () {
  return inline(r(root, 'build/index.html'), {
    compress: false,
    rootpath: r(root, 'build'),
    ignore: []
  }, onInlineEnd)
}

function onInlineEnd (err, html) {
  if (err) return console.error(err)
  return fs.writeFile(r(root, 'build/index.html'), html, 'utf-8', onWriteEnd)
}

function onWriteEnd (err) {
  if (err) return console.error(err)
  return console.log('Inlined CSS and JS.')
}

copyIndexFile()

if (dev) {
  fs.watch(r(root, 'app/index.html'), function () {
    console.log('index.html change detected')
    return copyIndexFile()
  })
}
