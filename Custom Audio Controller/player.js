import audios from "./data.js";
import { path, secondsToMinutes } from "./utils.js";
import elements from "./playerElements.js";
export default {
  audioData: audios,
  currentAudio: {},
  currentPlaying: 0, // Adicionando um Estado a aplicação, começando do estado 0
  isPlaying: false,
  isMuted: false,
  start() {
    elements.get.call(this);

    this.updateCardInfo();
  },
  play() {
    this.isPlaying = true;
    this.audio.play();
    this.playPause.innerHTML = "pause";
  },
  pause() {
    this.isPlaying = false;
    this.audio.pause();
    this.playPause.innerHTML = "play_arrow";
  },
  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  },

  timeUpdate() {
    this.currentDuration.innerHTML = secondsToMinutes(this.audio.currentTime);
    this.seekbarPlay.value = this.audio.currentTime;
  },

  mute() {
    this.isMuted = true;
    this.audio.muted = true;
    this.muteSong.innerHTML = "volume_off";
  },
  unmute() {
    this.isMuted = false;
    this.audio.muted = false;
    this.muteSong.innerHTML = "volume_up";
  },
  toggleMute() {
    if (this.isMuted) {
      this.unmute();
    } else {
      this.mute();
    }
  },
  setVolume(value) {
    this.audio.volume = value / 100;
  },

  nextSong() {
    this.currentPlaying++;
    this.pause();

    if (this.currentPlaying == this.audioData.length) {
      this.restart();
    }
    this.updateCardInfo();
  },
  prevSong() {
    this.currentPlaying--;
    this.pause();

    if (this.currentPlaying < 0) {
      this.currentPlaying = this.audioData.length - 1;

      this.updateCardInfo();
    }
    this.updateCardInfo();
  },

  setSeekBar(value) {
    this.audio.currentTime = value;
  },

  updateCardInfo() {
    this.currentAudio = this.audioData[this.currentPlaying];

    this.cover.style.background = `url('${path(
      this.currentAudio.cover
    )}') no-repeat center center / cover`;
    this.title.innerHTML = `<i class="material-icons">audiotrack</i> ${this.currentAudio.title}`;
    this.artist.innerHTML = this.currentAudio.artist;
    elements.createAudioElement.call(this, path(this.currentAudio.file));

    this.audio.onloadeddata = () => {
      console.log(this.audio.duration);

      elements.actions.call(this);
    };
  },
  restart() {
    this.currentPlaying = 0;
    this.updateCardInfo();
  },
};
