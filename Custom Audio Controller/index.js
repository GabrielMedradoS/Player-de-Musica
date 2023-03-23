import player from "./player.js";

// esperando a janela carregar para iniciar o player, uma boa pratica para nao ter bugs
window.addEventListener("load", () => {
  player.start();
});
