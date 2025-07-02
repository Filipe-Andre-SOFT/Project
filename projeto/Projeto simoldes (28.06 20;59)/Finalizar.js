window.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("approvalList");
  const btnAprovar = document.getElementById("btnAprovar");
  const btnVoltar = document.getElementById("btnVoltarDashboard");
  const toast = document.getElementById("toastMessage");

  // Seleção de item da lista
  list.addEventListener("click", (e) => {
    const item = e.target.closest("li");
    if (!item) return;

    // Limpa seleção anterior
    list.querySelectorAll("li").forEach(li => li.classList.remove("selected"));
    // Marca o clicado
    item.classList.add("selected");
  });

  // Função para exibir toast
  function showToast(message) {
    toast.textContent = message;
    toast.classList.remove("hidden");
    // Força reflow para iniciar animação
    void toast.offsetWidth;
    toast.classList.add("show");

    // Esconde após 2s
    setTimeout(() => {
      toast.classList.remove("show");
      toast.classList.add("hidden");
    }, 2000);
  }

  // Ao clicar em Aprovar
  btnAprovar.addEventListener("click", () => {
    const selected = list.querySelector("li.selected");
    if (!selected) return; // nada selecionado

    // Remove o item
    selected.remove();
    // Exibe mensagem de aprovação
    showToast("Aprovado!");
  });

  // Ao clicar em Voltar para o Dashboard
  btnVoltar.addEventListener("click", () => {
    window.location.href = "Dashboard_funcionario.html";
  });
});
