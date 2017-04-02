/*jshint esversion: 6 */

class Preload extends Phaser.State {
  preload() {
    // Load Assets
  }

  create() {
    // Start Next Game State
    this.game.state.start('HeroHome');
  }
}

export default Preload;
