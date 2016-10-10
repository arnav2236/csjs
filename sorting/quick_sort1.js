/*
  Time:  O(NlogN) - N splits into 2
  Space: O(N)     - for the subarrays
*/
function quick_sort1(arr) {
  // extract array length
  const { length } = arr;

  // base case: empty list or list with 1 element is already sorted
  if (length < 2) return arr;

  // set the pivot as the last element in the array
  const pivot = arr[length - 1];

  // create arrays to hold the subarray smaller than the pivot
  // and the subarray larger than the pivot
  const smaller = [];
  const larger = [];

  // build the smaller and larger arrays based on the pivo
  for (let i = 0; i < length - 1; i++) {
    if (arr[i] < pivot) {
      smaller.push(arr[i]);
    } else {
      larger.push(arr[i]);
    }
  }

  // recursively sort the subarrays and join them arround the pivot
  return [...quick_sort1(smaller), pivot, ...quick_sort1(larger)];
}
