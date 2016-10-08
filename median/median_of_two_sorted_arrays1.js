/*
  Time:  O(N + M) - iterating through both lists
  Space: O(N + M) - creating a combination array of the two lists
*/
function median_of_two_sorted_arrays1(sorted1, sorted2) {

  // determine the median index as the mid point of
  // combining the two lists
  const medianIndex = Math.floor(
    (sorted1.length + sorted2.length) / 2
  );

  // merge the two lists into a single sorted list
  const combined = combine(sorted1, sorted2);

  // return the element at the median index of the
  // sorted combination of the two lists
  return combined[medianIndex];
}

// merge two sorted arrays
function combine(sorted1, sorted2) {

  // create a temporary array to contain the sorted combination
  // of sorted1 and sorted2 arrays
  const combined = [];

  // create variables to keep track of the elements
  // in each sorted array
  let i1 = 0;
  let i2 = 0;

  // keep extracting the smaller element from each list
  // until one of the indexes goes out of bounds
  while (i1 < sorted1.length && i2 < sorted2.length) {
    if (sorted1[i1] < sorted2[i2]) {
      combined.push(sorted1[i1]);
      i1 += 1;
    } else {
      combined.push(sorted2[i2]);
      i2 += 1;
    }
  }

  // concat the remaining elements from the arrays
  // (only one of the lists may have elements left)
  // and return the combined sorted array
  return combined.concat(sorted1.slice(i1), sorted2.slice(i2));
}
