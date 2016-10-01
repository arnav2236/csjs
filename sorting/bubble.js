function bubble(arr) {
  const { length: len } = arr;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (arr[i] < arr[j]) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }

  return arr;
}
