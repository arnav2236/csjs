/*
  After the last time we make a swap,
  all subsequent elements must be sorted.
*/
function bubbleOptimized2(arr) {
  let { length: len } = arr;
  let swapped, currentSwap;
  let lastSwap = len - 1;
  do {
    swapped = false;
    currentSwap = -1;
    for (let i = 0; i < lastSwap; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
        currentSwap = i;
      }
    }
    lastSwap = currentSwap;
  } while (swapped);

  return arr;
}
