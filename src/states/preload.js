/*jshint esversion: 6 */

class Preload extends Phaser.State {
  preload() {
    // Load Player
    this.game.load.spritesheet('player', 'assets/images/chara2.png', 26, 36);
    this.game.load.image('bullet', 'assets/images/bullet.png');

    // Load boss
    this.game.load.spritesheet('boss', 'assets/images/elemental.png', 120, 129);
    this.game.load.spritesheet('boss1bullet', 'assets/images/waterbullet.png', 40, 56);
    this.game.load.spritesheet('boss2bullet', 'assets/images/firebullet.png', 40, 56);
  }

  create() {
    // Start Next Game State
    this.game.state.start('HeroHome');
  }
}

export default Preload;
