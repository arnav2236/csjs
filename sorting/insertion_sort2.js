/*
  Time: O(N^2) - for every element, we loop the entire array
  Space: O(1)
*/
function insertion_sort2(arr) {
  // extract array length
  const { length: len } = arr;

  // create variables to track insertion position and
  // the element being inserted
  let insertIdx, curr;

  // loop through the entire array: O(N)
  for (let i = 1; i < arr.length; i++) {
    // store the element being inserted
    curr = arr[i];
    // shift elements until we find the insertion position: O(N)
    insertPos = shiftAndFindInsertPos(i, arr, curr);
    // insert the element
    arr[insertPos] = curr;
  }

  // we are done inserting, return the sorted array
  return arr;
}

// shift elements to the right while they are greater than the current element
// return the index at which we stopped shifting. This is the insertion point.
function shiftAndFindInsertPos(idx, arr, curr) {
  for (; shouldShift(idx, arr, curr); idx--) {
    arr[idx] = arr[idx - 1];
  }
  return idx;
}

// determine if item at idx should be shifted right
function shouldShift(idx, arr, curr) {
  return idx > 0 && arr[idx - 1] > curr;
}
