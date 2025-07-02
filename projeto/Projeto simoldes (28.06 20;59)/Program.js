window.addEventListener("DOMContentLoaded", () => {
  // LOGIN
  const inputUsuario = document.getElementById("usuario");
  const inputSenha = document.getElementById("senha");
  const btnLogin = document.getElementById("btn-login");

  if (inputUsuario && inputSenha && btnLogin) {
    // Navegação com Enter
    inputUsuario.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        inputSenha.focus();
      }
    });

    inputSenha.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        realizarLogin();
      }
    });

    btnLogin.addEventListener("click", realizarLogin);
  }

  async function realizarLogin() {
    const userInput = inputUsuario.value.trim();
    const passInput = inputSenha.value.trim();

    if (!userInput || !passInput) {
      alert("⚠️ Preencha usuário e senha.");
      return;
    }

    try {
      const response = await fetch("Logins.json");
      if (!response.ok) throw new Error("Arquivo JSON não encontrado.");

      const usuarios = await response.json();

      const userValido = usuarios.find(
        (user) =>
          user.usuario === userInput &&
          user.senha === passInput &&
          user.tipo === "operador"
      );

      if (userValido) {
        window.location.href = "Dashboard_funcionario.html";
      } else {
        alert("❌ Usuário ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro ao carregar os dados:", error);
      alert("⚠️ Erro ao verificar login.");
    }
  }

  // RELÓGIO
  const clock = document.getElementById("clock");

  if (clock) {
    function atualizarRelogio() {
      const agora = new Date();
      const horas = agora.getHours().toString().padStart(2, "0");
      const minutos = agora.getMinutes().toString().padStart(2, "0");
      clock.textContent = `${horas}:${minutos}`;
    }
    setInterval(atualizarRelogio, 1000);
    atualizarRelogio();
  }

  // Função reutilizável para tentar carregar imagem com múltiplas extensões
  function carregarImagemComExtensoes(basePath, imgElement) {
    const extensoes = [".jpg", ".jpeg", ".png", ".webp"];
    let index = 0;

    function tentarCarregar() {
      if (index >= extensoes.length) {
        imgElement.src = "imagens_test/default.jpg"; // fallback
        return;
      }
      const caminho = `${basePath}${extensoes[index++]}`;
      imgElement.src = caminho;
      imgElement.onerror = tentarCarregar;
    }

    tentarCarregar();
  }

  // Busca para programa em execução
  const inputPrograma = document.getElementById("searchPrograma");
  const btnBuscarPrograma = document.getElementById("btnBuscarPrograma");

  if (inputPrograma && btnBuscarPrograma) {
    btnBuscarPrograma.addEventListener("click", () => {
      const valor = inputPrograma.value.trim();
      const img = document.getElementById("imagemExibida");
      if (valor && img) {
        carregarImagemComExtensoes(`imagens_test/${valor}`, img);
      }
    });

    inputPrograma.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        btnBuscarPrograma.click();
      }
    });
  }

  // Busca para pasta referência REFE
  const inputReferencia = document.getElementById("searchReferencia");
  const btnBuscarReferencia = document.getElementById("btnBuscarReferencia");

  if (inputReferencia && btnBuscarReferencia) {
    btnBuscarReferencia.addEventListener("click", () => {
      const valor = inputReferencia.value.trim();
      const img = document.getElementById("imagemExibida");
      if (valor && img) {
        carregarImagemComExtensoes(`imagens_test/REFE/${valor}`, img);
      }
    });

    inputReferencia.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        btnBuscarReferencia.click();
      }
    });
  }

  // Botão para lista de programas
  const btnLista = document.getElementById("btnListaProgramas");
  if (btnLista) {
    btnLista.addEventListener("click", () => {
      window.location.href = "Lista_programas.html";
    });
  }

  // Botão para finalizar produção
  const btnFinalizar = document.getElementById("btnFinalizar");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
      window.location.href = "Finalizar.html";
    });
  }
});
