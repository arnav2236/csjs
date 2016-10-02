
// async script loading and testing (not smart lol)
function tests() {

  const head = document.getElementsByTagName('head')[0];

  const testCount = 1;
  const isSorted = (arr) => {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) return false;
    }
    return true;
  };

  const testAlgorithm = (algo) => {
    return [...new Array(testCount)].every(() => {
      const algoCode = window[algo];
      const data = randomArray();
      const result = algoCode(data);
      return isSorted(result);
    });
  }

  const testCategory = (cat) => algorithms[cat].every(testAlgorithm);

  const loadAlgoScripts = (cat) =>
    algorithms[cat]
      .map((algo) => new Promise((resolve) => {
        loadScript(`./${cat}/${algo}.js`, resolve);
      }))
      .reduce(
        (chain, algoPromise) => chain.then(() => algoPromise),
        Promise.resolve()
      );

  categories.forEach((cat) => {
    loadAlgoScripts(cat)
      .then(() => {
        console.info(`Testing ${cat}`);
        testCategory(cat);
      })
      .then(() => {
        const allPassed = categories.every(testCategory);
        if (!allPassed) {
          alert('Test(s) Failed');
        } else {
          console.info('Tests Passed');
        }
      })
      .catch((reason) => {
        console.error(reason);
      });
  });

  // shoutout e-satis: http://stackoverflow.com/a/950146/3928341
  function loadScript(url, callback) {
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
