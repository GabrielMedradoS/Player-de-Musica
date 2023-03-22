const path = (file) => {
  return `files/${file}`;
};

// esperando a janela carregar para iniciar o player, uma boa pratica para nao ter bugs
window.addEventListener("load", () => {
  player.start();
});
