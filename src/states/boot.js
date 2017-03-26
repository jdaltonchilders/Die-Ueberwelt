/*jshint esversion: 6 */

class Boot extends Phaser.State {
  preload() {
  }

  create() {
    this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.game.state.start('preload');
  }
}

export default Boot;
