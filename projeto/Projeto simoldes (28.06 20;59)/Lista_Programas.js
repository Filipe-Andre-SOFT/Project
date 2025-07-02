// Referência aos elementos DOM
const fileInput        = document.getElementById('fileInput');
const listaFerramentas = document.getElementById('listaFerramentas');
const toolDetails      = document.querySelector('.tool-details');
const toolNameEl       = document.getElementById('toolName');
const toolAttrTable    = document.getElementById('toolAttributes');

// Ao escolher arquivos
fileInput.addEventListener('change', () => {
  listaFerramentas.innerHTML = '';
  toolDetails.hidden = true;

  Array.from(fileInput.files).forEach(file => {
    const li = document.createElement('li');
    li.textContent = file.name;
    li.style.cursor = 'pointer';
    li.onclick = () => loadAndRender(file);
    listaFerramentas.append(li);
  });
});

// Lê, extrai apenas o bloco "tool" e renderiza seus attributes
function loadAndRender(file) {
  const reader = new FileReader();
  reader.onload = event => {
    const text = event.target.result;

    // 1) Acha '"type" : "tool"' com regex
    const typeRegex = /"type"\s*:\s*"tool"/i;
    const typeMatch = text.match(typeRegex);
    if (!typeMatch) {
      return alert('Nenhuma ferramenta (type:"tool") encontrada em ' + file.name);
    }

    const idxType = typeMatch.index;

    // 2) Volta até a primeira '{' antes dessa posição
    const start = text.lastIndexOf('{', idxType);
    if (start < 0) {
      return alert('JSON de ferramenta mal‑formado em ' + file.name);
    }

    // 3) Brace‑counting para achar o fechamento do objeto "tool"
    let level = 0, end = -1;
    for (let i = start; i < text.length; i++) {
      if (text[i] === '{') level++;
      else if (text[i] === '}') {
        level--;
        if (level === 0) {
          end = i;
          break;
        }
      }
    }

    if (end < 0) {
      return alert('Não fechei o JSON de ferramenta em ' + file.name);
    }

    // 4) Parseia o objeto "tool"
    let toolObj;
    try {
      toolObj = JSON.parse(text.slice(start, end + 1));
    } catch (e) {
      return alert('Erro ao parsear objeto de ferramenta em ' + file.name + '\n' + e.message);
    }

    // 5) Extrai atributos
    const attrs = toolObj.attributes;
    if (!attrs || typeof attrs !== 'object') {
      return alert('“attributes” não encontrado dentro de tool em ' + file.name);
    }

    // 6) Renderiza na tela
    toolNameEl.textContent = toolObj.name || file.name.replace(/\.pmlent$/i, '');
    toolAttrTable.innerHTML = '<tr><th>Parâmetro</th><th>Valor</th></tr>';

    Object.entries(attrs).forEach(([k, v]) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${k}</td><td>${v}</td>`;
      toolAttrTable.append(tr);
    });

    toolDetails.hidden = false;
  };

  reader.readAsText(file);
}

// Redirecionar para o Dashboard
window.addEventListener("load", () => {
  const btnVoltar = document.getElementById("btnVoltarDashboard");
  if (btnVoltar) {
    btnVoltar.addEventListener("click", () => {
      console.log("Botão clicado!"); // Teste
      window.location.href = "Dashboard_funcionario.html";
    });
  } else {
    console.warn("Botão NÃO encontrado!");
  }
});
