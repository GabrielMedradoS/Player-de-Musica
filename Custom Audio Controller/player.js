import audios from "./data.js";
import { path } from "./utils.js";
import elements from "./playerElements.js";
export default {
  audioData: audios,
  currentAudio: {},
  currentPlaying: 0, // Adicionando um Estado a aplicação, começando do estado 0
  isPlaying: false,
  start() {
    elements.get.call(this);
    elements.actions.call(this);

    this.updateCardInfo();
    // Quando finalizar o audio
    this.audio.onended = () => this.nextSong();
  },
  play() {
    this.isPlaying = true;
    this.audio.play();
  },
  pause() {
    this.isPlaying = false;
    this.audio.pause();
  },
  togglePlayPause() {
    if ((this.isPlaying = false)) {
      this.pause();
    } else {
      this.play();
    }
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
    elements.createAudioElement.call(this, path(this.currentAudio.file));
    this.audio.src = path(this.currentAudio.file);
  },
  restart() {
    this.currentPlaying = 0;
    this.updateCardInfo();
  },
};
