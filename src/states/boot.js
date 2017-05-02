/*jshint esversion: 6 */

import AudioManager from "../utilities/audio-manager";

class Boot extends Phaser.State {
  
  preload() {
    const audioManager = new AudioManager(this.game);
    audioManager.preload();
  }

  create() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.state.start("GameMenu");
  }
}

export default Boot;
