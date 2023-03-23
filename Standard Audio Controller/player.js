window.player = {
  cover: document.querySelector(".card-image"),
  title: document.querySelector(".card-content h5"),
  artist: document.querySelector(".artist"),
  audio: document.querySelector("audio"),
  audioData: audios,
  currentAudio: {},
  currentPlaying: 0, // Adicionando um Estado a aplicação, começando do estado 0
  start() {
    this.updateCardInfo();
    // Quando finalizar o audio
    this.audio.onended = () => this.nextSong();
  },
  nextSong() {
    this.currentPlaying++;

    if (this.currentPlaying == this.audioData.length) {
      this.restart();
    }

    this.updateCardInfo();
    this.audio.play();
  },
  updateCardInfo() {
    this.currentAudio = this.audioData[this.currentPlaying];

    this.cover.style.background = `url('${path(
      this.currentAudio.cover
    )}') no-repeat center center / cover`;
    this.title.innerHTML = `<i class="material-icons">audiotrack</i> ${this.currentAudio.title}`;
    this.artist.innerHTML = this.currentAudio.artist;
    this.audio.src = path(this.currentAudio.file);
  },
  restart() {
    this.currentPlaying = 0;
    this.updateCardInfo();
  },
};
