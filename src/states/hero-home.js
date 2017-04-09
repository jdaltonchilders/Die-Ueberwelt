/*jshint esversion: 6 */
import Player from '../controllers/player';

export default class HeroHome extends Phaser.State {
  constructor() {
    // exception thrown here when not called
    super();

    // Tile Map
    this.map = null;

    // Tile Map Layers
    this.floor = null;
    this.walls = null;
    this.doors = null;
    this.underFurnitre = null;
    this.furniture = null;
    this.items = null;
    this.aboveFurniture = null;
    this.ceiling = null;

    // Collision Trigger Layers
    this.returnFromWorld = null;
    this.exitHouse = null;

    // Collision Trigger Layer Rect
    this.returnFromWorldRect = null;
    this.exitHouseRect = null;

    // Collision Border Layer
    this.collision = null;
    this.collisions = null;
    this.collisionCG = null;

    //Player
    this.player = null;
    this.playerPosition = null;
    this.playerController = null;
    this.playerCG = null;
  }

  preload() {
    // Load Tilemap
    this.game.load.tilemap('heroHome', 'assets/maps/HeroHome.json', null, Phaser.Tilemap.TILED_JSON);

    // Load Tilesets
    this.game.load.image('tiles_inside', 'assets/images/tiles/inside.png');
    this.game.load.image('tiles_inside_ceiling', 'assets/images/tiles/inside_changed.png');
    this.game.load.image('tiles_door', 'assets/images/tiles/doors.png');
    this.game.load.image('tiles_sky', 'assets/images/tiles/sky.png');

    // Load Player
    this.game.load.spritesheet('player', 'assets/images/chara2.png', 26, 36);
    this.game.load.image('bullet', 'assets/images/bullet.png');
  }

  create() {
    // Enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Create the Map
    this.map = this.game.add.tilemap('heroHome');
    this.map.addTilesetImage('inside', 'tiles_inside');
    this.map.addTilesetImage('inside_changed', 'tiles_inside_ceiling');
    this.map.addTilesetImage('doors', 'tiles_door');

    // Create layers
    this.floor = this.map.createLayer('Floor');
    this.walls = this.map.createLayer('Walls');
    this.doors = this.map.createLayer('Door');
    this.underFurnitre = this.map.createLayer('UnderFurniture');
    this.furniture = this.map.createLayer('Furniture');
    this.items = this.map.createLayer('Items');
    this.aboveFurniture = this.map.createLayer('AboveFurniture');
    this.ceiling = this.map.createLayer('Ceiling');

    // https://www.programmingmind.com/phaser/topdown-layers-moving-and-collision
    // Create Collision Trigger Layer
    this.returnFromWorld = this.map.objects.CollisionTrigger.find(object => object.name == 'ReturnFromWorld');
    this.exitHouse = this.map.objects.CollisionTrigger.find(object => object.name == 'ExitHouse');

    // Create Collision Trigger Layer Rect
    this.returnFromWorldRect = new Phaser.Rectangle(this.returnFromWorld.x, this.returnFromWorld.y, this.returnFromWorld.width, this.returnFromWorld.height);
    this.exitHouseRect = new Phaser.Rectangle(this.exitHouse.x, this.exitHouse.y, this.exitHouse.width, this.exitHouse.height);

    // Resize game world to match the floor (DOESN'T SEEM TO WORK RIGHT NOW)
    this.floor.resizeWorld();

    // Create the Player
    this.player = new Player(this.game, this.returnFromWorldRect.x, this.returnFromWorldRect.y);

    // Collide with Player
    var mapTileLength = this.map.tiles.length - 1;
    this.map.setCollisionBetween(1, mapTileLength, true, this.walls);
    this.map.setCollisionBetween(1, mapTileLength, true, this.doors);
    this.map.setCollisionBetween(1, mapTileLength, true, this.underFurnitre);
    this.map.setCollisionBetween(1, mapTileLength, true, this.furniture);
    this.map.setCollisionBetween(1, mapTileLength, true, this.items);
    this.map.setCollisionBetween(1, mapTileLength, true, this.aboveFurniture);
    this.map.setCollisionBetween(1, mapTileLength, true, this.ceiling);

    // Camera follows player
    this.game.camera.follow(this.player.sprite);
  }

  update() {
    // Handle Player Update
    this.player.update();

    // Collide with Layers
    this.game.physics.arcade.collide(this.player.sprite, this.walls);
    this.game.physics.arcade.collide(this.player.sprite, this.doors);
    this.game.physics.arcade.collide(this.player.sprite, this.underFurnitre);
    this.game.physics.arcade.collide(this.player.sprite, this.furniture);
    this.game.physics.arcade.collide(this.player.sprite, this.items);
    this.game.physics.arcade.collide(this.player.sprite, this.aboveFurniture);
    this.game.physics.arcade.collide(this.player.sprite, this.ceiling);

    // Update Player Position
    this.playerPosition = new Phaser.Rectangle(this.player.sprite.worldPosition.x, this.player.sprite.worldPosition.y, 0, 0);

    // Check if Exit House contains the Player
    if (this.exitHouseRect.contains(this.playerPosition.x, this.playerPosition.y)) {
      // Load the Hero Island State
      this.game.state.start('HeroIsland');
    }
  }

  render() {
    // this.game.debug.cameraInfo(this.game.camera, 32, 32);
    // this.game.debug.spriteCoords(this.player, 32, 500);
    this.game.debug.body(this.player.sprite);
  }
}
