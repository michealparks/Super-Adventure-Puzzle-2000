const { spliceArray } = require('./core')
const { events } = require('./enums')
const channels = []

for (let i = 0, l = Object.keys(events).length; i < l; ++i) {
  channels.push([])
}

function publish (index, data) {
  const channel = channels[index] || []

  for (let i = 0, l = channel.length; i < l; ++i) {
    channel[i](data)
  }
}

function subscribe (index, fn) {
  channels[index].push(fn)

  return channels[index].length - 1
}

function unsubscribe (index, id) {
  spliceArray(channels[index], id)
}

module.exports = {
  publish,
  subscribe,
  unsubscribe
}
