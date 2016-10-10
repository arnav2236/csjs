/*
  Time:  O(NlogN) - N splits into 2
  Space: O(logN)  - for recursion
*/
function quick_sort2(arr, left = 0, right = arr.length - 1) {
	if (left >= right) return arr;

  // sort the array such that
  // smaller elements are left of the pivot and
  // larger elements are right of the pivot
  const partitionIdx = partition(arr, left, right);

  // recursively sort the subarrays
  quick_sort2(arr, left, partitionIdx - 1);
  quick_sort2(arr, partitionIdx, right);

  // return the sorted array
  return arr;
}

function partition(arr, left, right) {

  // set the pivot as the middle element
  const pivot = arr[Math.floor((left + right) / 2)];

  // create variables to track each subarray index
  let leftIdx = left;
  let rightIdx = right;

  // partition the portion between left and right subarray
  // by swapping smaller elements that are right of the pivot
  // with larger elements that are left of the pivot
  while (leftIdx <= rightIdx) {

    // skip all element in the left subarray
    // that are smaller than the pivot
    while (arr[leftIdx] < pivot) {
      leftIdx += 1;
    }

    // skip all element in the right subarray
    // that are larger than the pivot
    while (arr[rightIdx] > pivot) {
      rightIdx -= 1;
    }

    // if the two indices still don't match,
    // it means there are elements that are
    // not positions correctly so we swap them
    if (leftIdx <= rightIdx) {

      // swap
      temp = arr[leftIdx];
      arr[leftIdx] = arr[rightIdx];
      arr[rightIdx] = temp;

      // change indices to continue looping
      leftIdx += 1;
      rightIdx -= 1;
    }
  }

  // return the leftIdx which is now the mid point of the partitioned array
  return leftIdx;
}
