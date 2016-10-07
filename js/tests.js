
// async script loading and testing (not smart lol)
function tests() {

  const head = document.getElementsByTagName('head')[0];

  const isSorted = (arr) => {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1] > arr[i]) return false;
    }
    return true;
  };

  const testCount = 10;
  const testAlgorithm = (algo) => {
    console.log(`Testing ${algo}`);
    const algoCode = window[algo];
    if (typeof algoCode !== 'function') throw `Missing method ${algo}`;

    const result = [...new Array(testCount)].every(() => {
      const data = randomArray();
      const result = algoCode(data);
      if (!isSorted(result)) {
        console.error(`Not Sorted <${algo}>: ${result}`);
        return false;
      }
      return true;
    });

    window[algo] = undefined; // reset
    return result;
  }

  const testCategory = (cat) => algorithms[cat].every(testAlgorithm);

  const testCategoryPromise = (cat) => new Promise(
    (resolve, reject) => {
      console.info(`Testing ${cat}
----------------------------`);
      if (testCategory(cat)) {
        resolve('Passed');
      } else {
        reject('Failed');
      }
    });

  const loadAlgoScripts = (cat) =>
    algorithms[cat]
      .map((algo) => new Promise((resolve) => {
        loadScript(cat, algo, resolve);
      }))
      .reduce(
        (chain, algoPromise) => chain.then(() => algoPromise),
        Promise.resolve()
      );

  const runTests = () => {
    categories.forEach((cat) => {
      loadAlgoScripts(cat)
        .then(() => testCategoryPromise(cat))
        .then(console.info)
        .catch(console.error);
    });
  };

  setTimeout(() => {
  runTests();
  }, 1000);

  // shoutout e-satis: http://stackoverflow.com/a/950146/3928341
  function loadScript(cat, algo, callback) {

    const url = `./${cat}/${algo}.js`;

    // Adding the script tag to the head as suggested before
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
  }
}
