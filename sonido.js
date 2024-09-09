class AudioElement {
  constructor(src) {
    this.audio = new Audio(src);
    this.audio.volume = 0.3;
    this.audio.loop = false;
    this.audio.onended = () => this.stop();
  }

  play() {
    this.audio.play();
  }
  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
  lowVolume() {
    this.audio.volume = 0.05;
  }
  upVolume() {
    this.audio.volume = 0.9;
  }
}
