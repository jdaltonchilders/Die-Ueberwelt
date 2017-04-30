/*jshint esversion: 6 */

import store from '../store';

class Preload extends Phaser.State {
  preload() {
    // Load Player
    this.game.load.spritesheet('player', 'assets/images/chara2.png', 26, 37);
    this.game.load.image('bullet', 'assets/images/bullet.png');

    // Load NPCs
    this.game.load.spritesheet('npc', 'assets/images/npc3.png', 26, 37);

    // Load items
    this.game.load.image('Pickaxe', 'assets/images/pickaxe.png');
    this.game.load.image('Staff', 'assets/images/staff.png');
    this.game.load.image('Shoes', 'assets/images/shoes.png');
    this.game.load.image('Robe', 'assets/images/robe.png');
    this.game.load.image('boulder', 'assets/images/boulder.png');

    // Load monsters
    this.game.load.spritesheet('wolf', 'assets/images/monster_wolf1.png', 64, 66);
    this.game.load.spritesheet('treant', 'assets/images/monster_golem2.png', 47, 50);
    // Load boss
    this.game.load.spritesheet('boss', 'assets/images/elemental.png', 120, 129);
    this.game.load.spritesheet('boss1bullet', 'assets/images/waterbullet.png', 40, 56);
    this.game.load.spritesheet('boss2bullet', 'assets/images/firebullet.png', 40, 56);
  }

  create() {
    // Fix up state info in Store
    store.previousState = 'Preload';
    store.currentState = store.nextState = 'HeroHome';

    // Start Next Game State
    // this.game.state.start('Test');
    this.game.state.start('HeroHome');
  }
}

export default Preload;
