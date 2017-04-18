/*jshint esversion: 6 */

import Player from '../controllers/player';

export default class AncientForest extends Phaser.State {
  constructor() {
    // Exception thrown here when not called
    super();
  }

  preload() {
    // Load Tilemap
    this.game.load.tilemap('ancientForest', 'assets/maps/ancientForest.json', null, Phaser.Tilemap.TILED_JSON);

    // Load Tilesets
    this.game.load.image('tiles_doors', 'assets/images/tiles/doors.png');
    this.game.load.image('tiles_castle', 'assets/images/tiles/castle.png');
    this.game.load.image('tiles_outside', 'assets/images/tiles/outside.png');
    this.game.load.image('tiles_outside_custom', 'assets/images/tiles/outside_custom.png');
    this.game.load.image('tiles_sky', 'assets/images/tiles/sky.png');
  }

  create() {
    // Enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Create the Map
    this.map = this.game.add.tilemap('ancientForest');
    this.map.addTilesetImage('doors', 'tiles_doors');
    this.map.addTilesetImage('castle', 'tiles_castle');
    this.map.addTilesetImage('outside', 'tiles_outside');
    this.map.addTilesetImage('outside_custom', 'tiles_outside_custom');
    this.map.addTilesetImage('sky', 'tiles_sky');

    // Create layers
    this.sky = this.map.createLayer('Sky');
    this.islandSide = this.map.createLayer('IslandSide');
    this.ground = this.map.createLayer('Ground');
    this.road = this.map.createLayer('Road');
    this.bridges = this.map.createLayer('Bridges');
    this.castle = this.map.createLayer('Castle');
    this.door = this.map.createLayer('Door');
    this.trees = this.map.createLayer('TreeBackground');
    this.trees = this.map.createLayer('TreeMiddleGround');
    this.trees = this.map.createLayer('TreeForeGround');
    this.trees = this.map.createLayer('TreeeForeGroundFront');
    this.collisionLayer = this.map.createLayer('CollisionLayer');

    // Create Collision Trigger Layer
    this.enterForest = this.map.objects.CollisionTrigger.find(object => object.name == 'EnterForest');
    this.exitForest = this.map.objects.CollisionTrigger.find(object => object.name == 'ExitForest');
    this.enterTheDungeon = this.map.objects.CollisionTrigger.find(object => object.name == 'EnterTheDungeon');
    this.returnFromDungeon = this.map.objects.CollisionTrigger.find(object => object.name == 'ReturnFromDungeon');

    // Create Collision Trigger Layer Rect
    this.enterForestRect = new Phaser.Rectangle(this.enterForest.x, this.enterForest.y, this.enterForest.width, this.enterForest.height);
    this.exitForestRect = new Phaser.Rectangle(
      this.exitForest.x,
      this.exitForest.y,
      this.exitForest.width,
      this.exitForest.height
    );
    this.enterTheDungeonRect = new Phaser.Rectangle(this.enterTheDungeon.x, this.enterTheDungeon.y, this.enterTheDungeon.width, this.enterTheDungeon.height);
    this.returnFromDungeonRect = new Phaser.Rectangle(this.returnFromDungeon.x, this.returnFromDungeon.y, this.returnFromDungeon.width, this.returnFromDungeon.height);

    // Resize game world to match the floor (DOESN'T SEEM TO WORK RIGHT NOW)
    this.ground.resizeWorld();

    // Create the Player
    this.player = new Player(this.game, this.enterForestRect.x, this.enterForestRect.y);

    // Collide with Player
    var mapTileLength = this.map.tiles.length - 1;
    this.map.setCollisionBetween(1, mapTileLength, true, this.collisionLayer);

    // Camera follows player
    this.game.camera.follow(this.player.sprite);
  }

  update() {
    // Handle Player Update
    this.player.update();

    // Collide with Layers
    this.game.physics.arcade.collide(this.player.sprite, this.collisionLayer);

    // Update Player Position
    this.playerPosition = new Phaser.Rectangle(this.player.sprite.worldPosition.x, this.player.sprite.worldPosition.y, 0, 0);

    // Check if Exit House contains the Player
    if (this.exitForestRect.contains(this.playerPosition.x, this.playerPosition.y)) {
      // Load the Hero Island State
      this.game.state.start('HeroIsland');
    }
  }

  shutdown() {
    this.game.sound.stopAll();
  }
}