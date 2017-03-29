import Player from './controllers/player';

const game = new Phaser.Game(800, 500, Phaser.AUTO, 'gameArea', { preload, create, update });

var playerController;

function preload() {
  game.load.spritesheet('player', 'assets/images/chara2.png', 26, 36);
  game.load.image('bullet', 'assets/images/bullet.png');
}

function create() {
  playerController = new Player(game, 0, 0);
}

function update() {
  playerController.update();
}
