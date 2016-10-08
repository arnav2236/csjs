/*
  Time:  O(N + M) - reduced by a factor of 1/2
  Space: O(1)     - no extra array

  We stop searching as soon as we reach the median index
*/
function median_of_two_sorted_arrays1_optimized1(sorted1, sorted2) {

  // determine the median index as the mid point of
  // combining the two lists
  const medianIndex = Math.floor(
    (sorted1.length + sorted2.length) / 2
  );

  // create variable to hold the median value
  let median = undefined;

  // create variables to keep track of the elements
  // in each sorted array
  let i1 = 0;
  let i2 = 0;

  // keep extracting the smaller element from each list
  // until one of the indexes goes out of bounds or
  // we reach the median index
  while (
    i1 < sorted1.length &&
    i2 < sorted2.length &&
    (i1 + i2) < medianIndex
  ) {
    if (sorted1[i1] < sorted2[i2]) {
      median = sorted1[i1];
      i1 += 1;
    } else {
      median = sorted2[i2];
      i2 += 1;
    }
  }

  // if we ran out of elements in sorted2 but haven't reached
  // the median index, keep iterating until we reach it
  if (i1 < sorted1.length) {
    while ((i1 + i2) < medianIndex) {
      median = sorted1[i1];
      i1 += 1;
    }
  }
  // otherwise if we ran out of elements in sorted1 but haven't reached
  // the median index, keep iterating until we reach it
  else if (i2 < sorted2.length){
    while ((i1 + i2) < medianIndex) {
      median = sorted2[i2];
      i2 += 1;
    }
  }

  // return the median
  return median;
}
