function spliceArray (arr, index) {
  if (index < (arr.length - 1)) {
    arr[index] = arr.pop()
  } else {
    arr.pop()
  }
}

module.exports = {
  spliceArray
}
