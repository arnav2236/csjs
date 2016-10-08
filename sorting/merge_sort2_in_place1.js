/*
  Time:  O(NlogN) - N splits into 2
  Space: O(logN) - for recursion

  Alter the merge function to merge the two arrays directly
  instead of creating a new array.
*/
function merge_sort2_in_place1(arr, start = 0, end = arr.length - 1) {
  if (start < end) {
    // split and sort the array recursively
    const mid = Math.floor((start + end) / 2);
    merge_sort2_in_place1(arr, start, mid);
    merge_sort2_in_place1(arr, mid + 1, end);

    // merge array halves
    merge_in_place(arr, start, mid, mid + 1, end);
  }
  return arr;
}

function merge_in_place(arr, startLeft, endLeft, startRight, endRight) {

  // create indexes to track positions in the left and right subarray
  let left = startLeft;
  let right = startRight;

  // create a variable to keep track of the overriden element
  // in the left subarray
  let temp;

  // create a variable to keep track of the shifted portion of the array
  let shifted;

  // while both arrays have elements
  while (left <= endLeft && right <= endRight) {
    // Select from left:  no change, just advance left
    if (arr[left] < arr[right]) {
      left += 1;
    }
    // otherwise
    else {
      // save the current element from the right index (will go left)
      temp = arr[right];

      // shift elements from the current left index
      // up and including the current right index
      // and overwrite the element at right index
      shifted = arr.splice(left, (right - left));
      arr.splice(left + 1, 0, ...shifted);

      // insert the save element at the proper place
      arr[left] = temp;

      // update indices because everything has moved up by one
      right += 1;
      left += 1;
      endLeft += 1;
    }
  }
}
