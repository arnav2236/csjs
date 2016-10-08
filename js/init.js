$(() => {

  setupEditors();

  const $categories = $('#js-categories');
  const $run = $('#js-run');
  const $random = $('#js-random');
  const $output = $('#js-output pre');

  let [currentCat, currentAlgo] = fromPath(window.location.hash.slice(1));

  // load algorithms
  $.each(categories, (_, cat) => {
    const $group = createAlgorithmSelectGroup(cat);
    $.each(algorithms[cat], (_, algo) => {
      $group.append(createAlgorithmSelectOption(cat, algo));
    });
    $categories.append($group);
  });

  $categories.change(({ target: { value }}) => {
    $output.empty();
    const [cat, algo] = fromSelectVal(value);
    loadAlgorithm(cat, algo)
      .then(() => {
        currentCat = cat;
        currentAlgo = algo;
      });
  });

  $run.click(() => {
    const codeString = getCodeString(currentCat, currentAlgo);
    try {
      const result = eval(codeString);
      const domResult = toDOMResult(result);
      $output.removeClass('error').html(domResult);
    } catch ({ message }) {
      $output.addClass('error').html(message);
    }
  });

  $random.click(() => {
    loadData(currentCat, currentAlgo);
  });

  loadAlgorithm(currentCat, currentAlgo)
    .then(() => {
      $categories.val(toSelectVal(currentCat, currentAlgo));
    });
});
