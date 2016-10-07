/*
  Time: O(NlogN)
  Space: O(N)
*/
function merge_sort2(arr, start = 0, end = arr.length - 1) {
  if (start < end) {

    // split and sort the array recursively
    const mid = Math.floor((start + end) / 2);
    merge_sort2(arr, start, mid);
    merge_sort2(arr, mid + 1, end);

    // merge array halves
    merge2(arr, start, mid, mid + 1, end);
  }

  // return sorted array
  return arr;
}

function merge2(arr, startLeft, endLeft, startRight, endRight) {

  // create a temporary array to contain the sorted combination
  // of left and right subarrays
  const sorted = [];

  // create temporary arrays for the left and right subarrays
  const left = arr.slice(startLeft, endLeft + 1);
  const right = arr.slice(startRight, endRight + 1);

  // while both arrays have elements, keep extracting the smaller one
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sorted.push(left.slice());
    } else {
      sorted.push(right.slice());
    }
  }

  // if either array (only one may) still has elements,
  // add them to the end of the sorted array
  sorted.push(left, right);

  // return sorted array
  return sorted;
}
