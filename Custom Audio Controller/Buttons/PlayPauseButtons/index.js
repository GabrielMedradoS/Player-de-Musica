export default {
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
};
