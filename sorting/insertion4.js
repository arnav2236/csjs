/*
  Time: O(N^2)
  Space: O(1)
*/
function insertion4(arr) {

  // create variables to track insertion position and
  // the element being inserted
  let insertIdx, curr;

  // loop through the entire array: O(N)
  for (let i = 1; i < arr.length; i++) {

    // find the insertion point for the current unsorted element: O(N)
    insertIdx = findInsertionIndex(arr, arr[i]);

    // if the insertion index is different than the index of
    // current unsorted element
    if (insertIdx !== i) {

      // remove the current sorted element from the array and
      // shift the elements from right to fill the removed space
      const [ curr ] = arr.splice(i, 1);

      // insert the removed element at the insertion point
      // and shift the remaining elements
      arr.splice(insertIdx, 0, curr);
    }
  }

  // we are done inserting, return the sorted array
  return arr;
}

// increment the index through the sorted portion
// until we find the position to insert the current element
function findInsertionIndex(arr, currUnsorted) {
  let idx = 0;
  while (arr[idx] < currUnsorted && idx < arr.length) idx++;
  return idx;
}
