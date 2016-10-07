/*
  After a loop iteration, the last
  element must be sorted.
*/
function bubble_sort1_optimized1(arr) {
  // extract array length and create the swapped flag
  let { length: len } = arr;
  let swapped;

  // loop while we can swap: O(N)
  do {
    // reset swapped flag on each iteration
    swapped = false;

    // loop through the unsorted portion of the array: O(N)
    for (let i = 0; i < len; i++) {

      // swap each pair of elements if current is greater then the next
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        // set swapped flag to signal array isn't sorted yet
        swapped = true;
      }
    }

    // reduce the next loop size since we sorted the last element
    len--;
  } while (swapped);

  // we are done swapping, array is sorted
  return arr;
}
