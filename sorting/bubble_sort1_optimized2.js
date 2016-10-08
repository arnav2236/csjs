/*
  Time:  O(N^2) - for every element, we loop the entire array (better factors)
  Space: O(1)

  After the last time we make a swap,
  all subsequent elements must be sorted.
*/
function bubble_sort1_optimized2(arr) {
  // create the swapped flag
  let swapped;

  // create variables to track the current and last swap indexes
  let currentSwapIdx, lastSwapIdx = arr.length - 1;

  // loop while we can swap: O(N)
  do {

    // reset swapped and currentSwapIdx flags on each iteration
    swapped = false;
    currentSwapIdx = -1;

    // OPTIMIZATION:
    // loop through the unsorted portion of the array: O(N)
    for (let i = 0; i < lastSwapIdx; i++) {

      // swap each pair of elements if current is greater then the next
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        // set swapped flag to signal array isn't sorted yet
        swapped = true;
        // remember the current swapped index
        currentSwapIdx = i;
      }
    }

    // update the last swapped index
    lastSwapIdx = currentSwapIdx;
  } while (swapped);

  // we are done swapping, array is sorted
  return arr;
}
