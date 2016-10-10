/*
  Time:  O(NlogN) - N splits into 2
  Space: O(logN)  - for recursion

  The pivot is the median between the first, middle and last element
*/
function quick_sort2_optimized1(arr, left = 0, right = arr.length - 1) {
	if (left >= right) return arr;

  // sort the array such that
  // smaller elements are left of the pivot and
  // larger elements are right of the pivot
  const partitionIdx = partition(arr, left, right);

  // recursively sort the subarrays
  quick_sort2_optimized1(arr, left, partitionIdx - 1);
  quick_sort2_optimized1(arr, partitionIdx, right);

  // return the sorted array
  return arr;
}

function partition(arr, left, right) {

  // set the pivot as the median value of
  // the first, middle and last element
  const pivot = medianOf3(
    arr[0],
    arr[Math.floor((left + right) / 2)],
    arr[arr.length - 1]
  );

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

function medianOf3(a, b, c) {
  const high = Math.max(a, Math.min(b, c));
  const low = Math.min(high, Math.max(b, c));
  return low;
}
