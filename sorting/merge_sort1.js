/*
  Time:  O(NlogN) - N splits into 2
  Space: O(N)     - because we are creating new arrays
                    (there's also a logN recursion factor)
*/
function merge_sort1(arr) {
  // extract the length of the array
  const { length } = arr;

  // if array has 1 or less elements, its already sorted
  if (length < 2) return arr;

  // split the array in the middle into two sub arrays
  const middle = Math.floor(length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle, length);

  // sort the left and right halves
  const leftSorted = merge_sort1(left);
  const rightSorted = merge_sort1(right);

  // merge the sorted halves
  return merge1(leftSorted, rightSorted);
}

// merge two sorted arrays
function merge1(left, right) {

  // create a temporary array to contain the sorted combination
  // of left and right subarrays
  const sorted = [];

  // while both arrays have elements
  // keep extracting the smaller one
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sorted.push(left.shift());
    } else {
      sorted.push(right.shift());
    }
  }

  // if the left array still has elements, add them
  while(left.length) sorted.push(left.shift());

  // if the right array still has elements, add them
  while(right.length) sorted.push(right.shift());

  // return sorted array
  return sorted;
}
