const capitalize = (x) => x.charAt(0).toUpperCase() + x.slice(1);
const typeToId = (type) => `js-editor-${type}`;
const grabById = (id) => $(`#${id}`);
const randomInt = () => Math.floor(
  1 + Math.random() * 9 *
  (Math.random() > 0.5 ? -1 : 1)
);
const randomInRange = (min, max) => Math.floor(min + Math.random() * max);
const randomArray = () => [...new Array(randomInRange(5, 15))].map(randomInt);
const randomSortedArray = () => randomArray().sort(
  (a, b) => a > b ? 1 : a < b ? -1 : 0
);

const defaultCat = 'sorting';
const defaultAlgo = 'bubble_sort1';

const toSelectVal = (cat, algo) => `${cat}-${algo}`;
const fromSelectVal = (value) => value.split('-');

const toPath = (cat, algo) => `/${cat}/${algo}`;
const fromPath = (path) => {
  const [
    currentCat = defaultCat,
    currentAlgo = defaultAlgo
  ] = path.split('/').filter(x => !!x);
  return [currentCat, currentAlgo];
}

const prettyAlgoName = (algo) => algo
  .replace(/_/g, ' ')
  .split(' ')
  .map(capitalize)
  .join(' ')
  .replace(/(\d+)/g, ' $1');

const idToTheme = (id) => (
  id.replace('js-editor-', '') === 'code' ?
  'solarized_light' :
  'tomorrow_night'
);

function idToEditor(id) {
  const editor = ace.edit(id);
  editor.setTheme(`ace/theme/${idToTheme(id)}`);
  editor.getSession().setMode('ace/mode/javascript');
  editor.blur();
  editor.$blockScrolling = Infinity; // disabled deprecation message
  return editor;
}

const setGlobalEditor = (type, editor, $editor) => {
  window[`${type}Editor`] = {
    editor,
    $editor
  };
};

const getGlobalEditor = (type) => window[`${type}Editor`];

const getEditorValue = (type) => (
  getGlobalEditor(type)
  .editor
  .getValue()
);

const setEditorValue = (type, value) => (
  getGlobalEditor(type)
  .editor
  .setValue(value)
);

function setupEditors() {
  const ids = ['code', 'data'].map(typeToId);
  const [ codeEditor, dataEditor ] = ids.map(idToEditor);
  const [ $codeEditor, $dataEditor ] = ids.map(grabById);
  setGlobalEditor('code', codeEditor, $codeEditor);
  setGlobalEditor('data', dataEditor, $dataEditor);
  window.codeEditor.editor.setReadOnly(true);

  const $root = $('.output');
  $('.editor')
    .css('font-size', $root.css('font-size'))
    .css('font-family', $root.css('font-family'));
}

function createAlgorithmSelectGroup(cat) {
  return $(`<optgroup label="${capitalize(cat)}"></optgroup>`);
}

function createAlgorithmSelectOption(cat, algo) {
  return `
    <option value="${toSelectVal(cat, algo)}" class="algorithm">
      ${prettyAlgoName(algo)}
    </option>
  `;
}

function getAlgorithm(path) {
  return fetch(`.${path}.js`)
    .then((res) => {
      if(res.ok) {
        return res.text();
      } else {
        throw 'Network Problem';
      }
    });
}

function loadAlgorithm(cat, algo) {
  const path = toPath(cat, algo);
  return getAlgorithm(path)
    .then((code) => {
      setEditorValue('code', code);
      window.location.hash = path;
      loadData(cat, algo);
    })
    .catch(() => {
      if (cat !== defaultCat || algo !== defaultAlgo) {
        return loadAlgorithm(defaultCat, defaultAlgo);
      }
    });
}

function loadRandomArray() {
  setEditorValue('data', `
const arr = [${randomArray()}];
  `);
}

function loadTwoSortedArrays() {
  setEditorValue('data', `
const sorted1 = [${randomSortedArray()}];
const sorted2 = [${randomSortedArray()}];
  `);
}

function loadData(cat, algo) {
  switch (cat) {
    case 'sorting': return loadRandomArray();
    case 'median': return loadTwoSortedArrays();
    default: throw `Invalid Category ${cat}`;
  }
}

function getArgsForCat(cat) {
  switch (cat) {
    case 'sorting': return `arr`;
    case 'median': return `sorted1, sorted2`;
    default: throw `Invalid Category ${cat}`;
  }
}

function getCodeString(cat, algo) {
  const code = getEditorValue('code');
  const data = getEditorValue('data');

  const args = getArgsForCat(cat);

  return `
    ${data}
    ${code}
    ${algo}(${args});
  `;
}

function toDOMResult(arrString) {
  return `${arrString.toString().replace(/(-?\d+)/g, `<span class="digit">&nbsp;$1</span>`)}`;
}
