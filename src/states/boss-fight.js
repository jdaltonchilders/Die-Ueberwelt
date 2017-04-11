/*jshint esversion: 6 */

import Player from '../controllers/player';
import Boss from '../controllers/boss';
import Boulder from '../controllers/boulder';

export default class BossFight extends Phaser.State {
  constructor() {
    // exception thrown here when not called
    super();

    // Tile Map
    this.map = null;

    // Tile Map Layers
    this.ground = null;
    this.heroBorder = null;
    this.cliff = null;
    this.items = null;

    // Collision Trigger Layers
    this.entranceFromOverworld = null;

    // Collision Trigger Layer Rect
    this.entranceFromOverworldRect = null;

    //Player
    this.playerController = null;
  }

  preload() {
    // Load Tilemap
    this.game.load.tilemap('bossLand', 'assets/maps/bossLand.json', null, Phaser.Tilemap.TILED_JSON);

    // Load Tilesets
    this.game.load.image('tiles_outside', 'assets/images/tiles/outside.png');

    // Load Player
    this.game.load.spritesheet('player', 'assets/images/chara2.png', 26, 36);
    this.game.load.image('bullet', 'assets/images/bullet.png');
  }

  create() {
    // Enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Create the Map
    this.map = this.game.add.tilemap('bossLand');
    this.map.addTilesetImage('outside', 'tiles_outside');

    //  Create layers
    this.ground = this.map.createLayer('Ground');
    this.heroBorder = this.map.createLayer('HeroBorder');
    this.cliff = this.map.createLayer('Cliff');
    this.items = this.map.createLayer('Items');

    // Create Collision Trigger Layer
    this.entranceFromOverworld = this.map.objects.CollisionTrigger.find(object => object.name == 'EntranceFromOverworld');

    // Create Collision Trigger Layer Rect
    this.entranceFromOverworldRect = new Phaser.Rectangle(
      this.entranceFromOverworld.x,
      this.entranceFromOverworld.y,
      this.entranceFromOverworld.width,
      this.entranceFromOverworld.height
    );

    // Resize game world to match the ground
    this.ground.resizeWorld();

    // Create map objects
    const maxBoulders = 50;
    this.boulders = [];
    while (this.boulders.length < maxBoulders) {
      const x = this.game.rnd.between(1, 24) * 32;
      const y = this.game.rnd.between(2, 24) * 32;
      this.boulders.push(new Boulder(this.game, x, y));
    }

    // Create boss
    this.bossController = new Boss(this.game, this.game.world.centerX, this.game.world.centerY);

    // Create the Player
    this.playerController = new Player(this.game, this.entranceFromOverworldRect.x, this.entranceFromOverworldRect.y);

    // Attach player to boss
    this.bossController.setTarget(this.playerController.sprite);
    this.bossController.setPlayerBullets(this.playerController.bullets);

    // Collide with Player
    var mapTileLength = this.map.tiles.length - 1;
    this.map.setCollisionBetween(1, mapTileLength, true, this.cliff);
    this.map.setCollisionBetween(1, mapTileLength, true, this.items);

    // Camera follows player
    this.game.camera.follow(this.playerController.sprite);
  }

  update() {
    // Update map objects
    // Lol demo soon
    const bullets = [...this.bossController.waterBullets.children, ...this.bossController.fireBullets.children, ...this.playerController.bullets.children];
    this.boulders.forEach(boulder => {
      boulder.update(this.playerController.sprite, bullets);
    });

    // Update boss
    this.bossController.update();

    // Handle Player Update
    this.playerController.update();

    // Collide with Layers
    this.game.physics.arcade.collide(this.playerController.sprite, this.cliff);
    this.game.physics.arcade.collide(this.playerController.sprite, this.items);

    // Update Player Position
    this.playerPosition = new Phaser.Rectangle(this.playerController.sprite.worldPosition.x, this.playerController.sprite.worldPosition.y, 0, 0);
  }

  render() {
    this.game.debug.body(this.bossController.sprite);
    this.game.debug.body(this.playerController.sprite);
  }
}
