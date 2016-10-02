/*
  Time: O(N^2)
  Space: O(1)
*/
function insertion3(arr) {
  // extract array length
  const { length: len } = arr;

  // loop through the entire array: O(N)
  for (let i = 1; i < len; i++) {

    // loop through the sorted portion of the array: O(N)
    for (let j = 0; j < i; j++) {

      // find the insertion point for the current unsorted element
      if (arr[j] > arr[i]) {

        // remove the current sorted element from the array and
        // shift the elements from right to fill the removed space
        const [ curr ] = arr.splice(i, 1);

        // insert the removed element at the insertion point
        // and shift the remaining elements
        arr.splice(j, 0, curr);
      }
    }
  }

  // we are done inserting, return the sorted array
  return arr;
}
