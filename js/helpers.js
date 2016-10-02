const capitalize = (x) => x.charAt(0).toUpperCase() + x.slice(1);
const typeToId = (type) => `js-editor-${type}`;
const grabById = (id) => $(`#${id}`);
const randomInt = () => Math.floor(
  1 + Math.random() * 9 *
  (Math.random() > 0.5 ? -1 : 1)
);
const randomInRange = (min, max) => Math.floor(min + Math.random() * max);
const randomArray = () => [...new Array(randomInRange(5, 15))].map(randomInt);

const defaultCat = 'sorting';
const defaultAlgo = 'bubble';

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
  .replace('_', ' ')
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
      window.codeEditor.editor.setValue(code);
      window.location.hash = path;
    })
    .catch(() => {
      if (cat !== defaultCat || algo !== defaultAlgo) {
        return loadAlgorithm(defaultCat, defaultAlgo);
      }
    });
}

function loadData(data) {
  window.dataEditor.editor.setValue(`
const arr = [${data}];
  `);
}

function loadRandomArrayData() {
  loadData(randomArray());
}

function getCodeString(algo) {
  const code = window.codeEditor.editor.getValue();
  const data = window.dataEditor.editor.getValue();

  return `
    ${data}
    ${code}
    ${algo}(arr);
  `;
}

function toDOMArray(arrString) {
  return `[${arrString.toString().replace(/(\d+)/g, `<span class="digit">&nbsp;$1</span>`)}]`;
}
