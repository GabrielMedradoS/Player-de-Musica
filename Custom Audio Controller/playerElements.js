import { secondsToMinutes } from "./utils.js";

export default {
  get() {
    this.cover = document.querySelector(".card-image");
    this.title = document.querySelector(".card-content h5");
    this.artist = document.querySelector(".artist");

    this.playPause = document.querySelector("#play-pause");
    this.muteSong = document.querySelector("#muteSong");

    this.seekbarVol = document.querySelector("#seekbarVol");
    this.seekbarPlay = document.querySelector("#seekbarPlay");

    this.currentDuration = document.querySelector("#current-duration");
    this.totalDuration = document.querySelector("#total-duration");

    this.navigateNext = document.querySelector("#navigate-next");
    this.navigateBefore = document.querySelector("#navigate-before");
  },
  createAudioElement(audio) {
    this.audio = new Audio(audio);
  },
  actions() {
    const Buttons = [
      this.playPause,
      this.navigateBefore,
      this.navigateNext,
      this.muteSong,
    ];

    const seekbars = [this.seekbarVol, this.seekbarPlay];
    // Quando finalizar o audio
    this.audio.onended = () => this.nextSong();
    this.audio.ontimeupdate = () => this.timeUpdate();

    Buttons.forEach((button) => {
      button.addEventListener("click", () => {
        switch (button) {
          case this.playPause:
            this.togglePlayPause();
            break;
          /*           case this.navigateNext:
            this.nextSong();
            break;
          case this.navigateBefore:
            this.prevSong();
            break; */
          case this.muteSong:
            this.toggleMute();
            break;
        }
      });
    });

    /*     seekbars.forEach((seekbar) => {
      seekbar.addEventListener("onchange", () => {
        switch (seekbar) {
          case this.seekbarVol:
            this.setVolume(this.seekbarVol.value);
            break;
          case this.seekbarPlay.onchange:
            this.setSeekBar(this.seekbarPlay.value);
        }
      });
    }); */

    this.seekbarVol.oninput = () => this.setVolume(this.seekbarVol.value);
    this.seekbarVol.onchange = () => this.setVolume(this.seekbarVol.value);

    this.seekbarPlay.oninput = () => this.setSeekBar(this.seekbarPlay.value);
    this.seekbarPlay.onchange = () => this.setSeekBar(this.seekbarPlay.value);
    this.seekbarPlay.max = this.audio.duration;

    this.totalDuration.innerHTML = secondsToMinutes(this.audio.duration);
  },
};
