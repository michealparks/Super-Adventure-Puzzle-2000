/* global self */

self.onmessage = function (e) {
  const gridData = e.data[0]
  const bipLoc = e.data[1]
  let paths = []
  let steps = Math.floor(Math.random() * 5)

  while (steps-- > 0) {
    const a = Math.round(Math.random() * 1)
    const b = Math.round(Math.random() * 1)
    const c = b === 0 ? 1 : -1

    if (a === 1) {
      paths.push([0, c])
    } else {
      paths.push([c, 0])
    }
  }

  self.postMessage(paths)
}
