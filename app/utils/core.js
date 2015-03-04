export default {

  spliceArray(arr, index) {
    if (index < (arr.length - 1)) {
      arr[index] = arr.pop();
    } else {
      arr.pop()
    }
  }

}