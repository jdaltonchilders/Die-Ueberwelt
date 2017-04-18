/*jshint esversion: 6 */

import Player from '../controllers/player';

export default class HeroIsland extends Phaser.State {
  constructor() {
    // Exception thrown here when not called
    super();
  }

  preload() {
    // Load Tilemap
    this.game.load.tilemap('heroIsland', 'assets/maps/heroIsland.json', null, Phaser.Tilemap.TILED_JSON);

    // Load Tilesets
    this.game.load.image('tiles_doors', 'assets/images/tiles/doors.png');
    this.game.load.image('tiles_house', 'assets/images/tiles/house.png');
    this.game.load.image('tiles_outside', 'assets/images/tiles/outside.png');
    this.game.load.image('tiles_outside_custom', 'assets/images/tiles/outside_custom.png');
    this.game.load.image('tiles_water', 'assets/images/tiles/water.png');
    this.game.load.image('tiles_sky', 'assets/images/tiles/sky.png');
  }

  create() {
    // Enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Create the Map
    this.map = this.game.add.tilemap('heroIsland');
    this.map.addTilesetImage('doors', 'tiles_doors');
    this.map.addTilesetImage('house', 'tiles_house');
    this.map.addTilesetImage('outside', 'tiles_outside');
    this.map.addTilesetImage('outside_custom', 'tiles_outside_custom');
    this.map.addTilesetImage('water', 'tiles_water');
    this.map.addTilesetImage('sky', 'tiles_sky');

    // Create layers
    this.sky = this.map.createLayer('Sky');
    this.islandSide = this.map.createLayer('IslandSide');
    this.ground = this.map.createLayer('Ground');
    this.roads = this.map.createLayer('Roads');
    this.water = this.map.createLayer('Water');
    this.bridges = this.map.createLayer('Bridges');
    this.fences = this.map.createLayer('Fences');
    this.graveyard = this.map.createLayer('Graveyard');
    this.houses = this.map.createLayer('Houses');
    this.items = this.map.createLayer('Items');
    this.doors = this.map.createLayer('Doors');
    this.trees = this.map.createLayer('Trees');
    this.collisionLayer = this.map.createLayer('CollisionLayer');

    // Create Collision Trigger Layer
    this.enterHeroHouse = this.map.objects.CollisionTrigger.find(object => object.name == 'EnterHeroHouse');
    this.returnFromHeroHouse = this.map.objects.CollisionTrigger.find(object => object.name == 'ReturnFromHeroHouse');
    this.bossFight = this.map.objects.CollisionTrigger.find(object => object.name == 'BossFight');

    // Create Collision Trigger Layer Rect
    this.enterHeroHouseRect = new Phaser.Rectangle(this.enterHeroHouse.x, this.enterHeroHouse.y, this.enterHeroHouse.width, this.enterHeroHouse.height);
    this.returnFromHeroHouseRect = new Phaser.Rectangle(
      this.returnFromHeroHouse.x,
      this.returnFromHeroHouse.y,
      this.returnFromHeroHouse.width,
      this.returnFromHeroHouse.height
    );
    this.bossFightRect = new Phaser.Rectangle(this.bossFight.x, this.bossFight.y, this.bossFight.width, this.bossFight.height);

    // Resize game world to match the floor (DOESN'T SEEM TO WORK RIGHT NOW)
    this.ground.resizeWorld();

    // Create the Player
    this.player = new Player(this.game, this.returnFromHeroHouseRect.x, this.returnFromHeroHouseRect.y);

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
    if (this.enterHeroHouseRect.contains(this.playerPosition.x, this.playerPosition.y)) {
      // Load the Hero Island State
      this.game.state.start('HeroHome');
    }

    // Check if Boss Fight contains the Player
    if (this.bossFightRect.contains(this.playerPosition.x, this.playerPosition.y)) {
      // Load the Boss Fight State
      this.game.state.start('BossFight');
    }
  }

  shutdown() {
    this.game.sound.stopAll();
  }
}
