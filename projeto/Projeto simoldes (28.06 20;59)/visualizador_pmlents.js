function loadAndRender(file) {
  const reader = new FileReader();
  reader.onload = event => {
    const text = event.target.result;

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return alert('Erro ao parsear JSON completo em ' + file.name + '\n' + e.message);
    }

    let toolObj;
    if (Array.isArray(data)) {
      toolObj = data.find(obj => obj.type === 'tool');
    } else if (typeof data === 'object' && data !== null) {
      if (data.type === 'tool') {
        toolObj = data;
      } else {
        for (const key in data) {
          const val = data[key];
          if (val && typeof val === 'object' && val.type === 'tool') {
            toolObj = val;
            break;
          }
        }
      }
    }

    if (!toolObj) {
      return alert('Nenhuma ferramenta (type:"tool") encontrada em ' + file.name);
    }

    // Exibe a imagem da ferramenta
    toolNameEl.textContent = toolObj.name || file.name.replace(/\.pmlent$/i, '');
    toolAttrTable.innerHTML = ''; // limpando tabela

    const img = document.createElement('img');
    img.style.maxWidth = '100%';
    img.style.height = 'auto';

    if (toolObj.image) {
      img.src = toolObj.image;
      img.alt = toolObj.name || 'Imagem da ferramenta';
    } else {
      img.alt = 'Imagem não disponível';
      img.style.display = 'none';
      alert('Imagem não encontrada em ' + file.name);
    }

    // Remove imagem antiga e adiciona nova
    const existingImg = toolDetails.querySelector('img');
    if (existingImg) existingImg.remove();

    toolDetails.appendChild(img);
    toolDetails.hidden = false;
  };

  reader.readAsText(file);
}
