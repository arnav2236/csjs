const capitalize = (x) => x.charAt(0).toUpperCase() + x.slice(1);
const typeToId = (type) => `js-editor-${type}`;
const grabById = (id) => $(`#${id}`);
const randomInt = () => Math.floor(1 + Math.random() * 9);
const randomInRange = (min, max) => Math.floor(min + Math.random() * max);
const randomArray = () => [...new Array(randomInRange(5, 20))].map(randomInt);

function idToTheme(id) {
  return (id.replace('js-editor-', '') === 'code') ? 'solarized_light' : 'tomorrow_night';
}

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
    <option value="${cat}-${algo}" class="algorithm">
      ${capitalize(algo)} Sort
    </option>
  `;
}

function loadAlgorithm(cat, algo) {
  $.get(`./${cat}/${algo}.js`, (res) => {
    window.codeEditor.editor.setValue(res);
  });
}

function loadData(data) {
  window.dataEditor.editor.setValue(`[${data}];`);
}

function loadRandomArrayData() {
  loadData(randomArray());
}

function getCodeString(algo) {
  const code = window.codeEditor.editor.getValue();
  const data = window.dataEditor.editor.getValue();

  return `
    const data=${data}
    ${code}
    ${algo}(data);
  `;
}

function toDOMArray(arrString) {
  return `[${arrString.toString().replace(/(\d)/g, `<span class="digit">&nbsp;$1</span>`)}]`;
}
