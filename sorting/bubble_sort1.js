/*
  Time: O(N^2)
  Space: O(1)
*/
function bubble_sort1(arr) {
  // create the swapped flag
  let swapped;

  // loop while we can swap: O(N)
  do {
    // reset swapped flag on each iteration
    swapped = false;

    // loop through the entire array: O(N)
    for (let i = 0; i < arr.length; i++) {

      // swap each pair of elements if current is greater then the next
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        // set swapped flag to signal array isn't sorted yet
        swapped = true;
      }
    }
  } while (swapped);

  // we are done swapping, array is sorted
  return arr;
}
