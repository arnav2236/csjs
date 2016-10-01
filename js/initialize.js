$(() => {

  setupEditors();

  const $categories = $('#js-categories');
  const $run = $('#js-run');
  const $random = $('#js-random');
  const $output = $('#js-output pre');

  const [currentCat, currentAlgo] = fromPath(window.location.hash.slice(1));

  // load algorithms
  $.each(categories, (_, cat) => {
    const $group = createAlgorithmSelectGroup(cat);
    $.each(algorithms[cat], (_, algo) => {
      $group.append(createAlgorithmSelectOption(cat, algo));
    });
    $categories.append($group);
  });

  $categories.change(({ target: { value }}) => {
    const [cat, algo] = fromSelectVal(value);
    loadAlgorithm(cat, algo)
      .then(() => {
        currentCat = cat;
        currentAlgo = algo;
      });
  });

  $run.click(() => {
    const codeString = getCodeString(currentAlgo);
    try {
      const result = eval(codeString);
      $output.removeClass('error').html(toDOMArray(result));
    } catch ({ message }) {
      $output.addClass('error').html(message);
    }
  });

  $random.click(loadRandomArrayData);

  loadAlgorithm(currentCat, currentAlgo)
    .then(() => {
      $categories.val(toSelectVal(currentCat, currentAlgo));
    });
  loadRandomArrayData();
});
