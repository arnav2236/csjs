/*
  After a loop iteration, the last
  element must be sorted.
*/
function bubbleOptimized1(arr) {
  let { length: len } = arr;
  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < len; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      }
    }
    len--; // optimization
  } while (swapped);

  return arr;
}
