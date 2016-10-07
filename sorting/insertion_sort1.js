/*
  Time: O(N^2)
  Space: O(1)
*/
function insertion_sort1(arr) {
  // extract array length
  const { length: len } = arr;
  // create variables to track insertion position and
  // the element being inserted
  let insertIdx, curr;

  // loop through the entire array: O(N)
  for (let i = 1; i < len; i++) {

    // start looking for the insertion index from the current index
    insertIdx = i;
    curr = arr[insertIdx];

    // shift elements while they are greater than the current element: O(N)
    // update insertion index on each shift
    while (insertIdx > 0 && arr[insertIdx - 1] > curr) {
      arr[insertIdx] = arr[insertIdx - 1];
      insertIdx -= 1;
    }

    // we are done shifting -> insertion position is found
    arr[insertIdx] = curr;
  }

  // we are done inserting, return the sorted array
  return arr;
}
