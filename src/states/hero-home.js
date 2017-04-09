/*jshint esversion: 6 */

import Pickaxe from '../items/pickaxe';
import Boulder from '../controllers/boulder';
import Player from '../controllers/player';

class HeroHome extends Phaser.State {
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

    // Collision Layers
    this.collisionTrigger = null;

    // Player
    this.playerController = null;
  }

  preload() {
    // Load Tilemap
    this.game.load.tilemap('heroHome', 'assets/maps/HeroHome.json', null, Phaser.Tilemap.TILED_JSON);

    // Load Tilesets
    this.game.load.image('tiles_inside', 'assets/images/tiles/inside.png');
    this.game.load.image('tiles_inside_ceiling', 'assets/images/tiles/inside_changed.png');
    this.game.load.image('tiles_door', 'assets/images/tiles/doors.png');

    // Load Player
    this.game.load.spritesheet('player', 'assets/images/chara2.png', 26, 36);
    this.game.load.image('bullet', 'assets/images/bullet.png');

    // Test: Load items
    this.game.load.image('Pickaxe', 'assets/images/pickaxe.png');
    this.game.load.image('boulder', 'assets/images/boulder.png');
  }

  create() {
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

    // Create map objects
    this.boulder = new Boulder(this.game, 100, 120);

    // Create Collision Layer
    // Resize game world to match the floor (DOESN'T SEEM TO WORK RIGHT NOW)
    this.floor.resizeWorld();

    // Create the Player
    this.playerController = new Player(this.game, 0, 0);
    // TODO: Add collision layer to map
    // TODO: Add collision detection
    // Items testing
    this.item = Pickaxe(this.game, 48, 48, this.playerController.sprite);
    this.item2 = Pickaxe(this.game, 72, 106, this.playerController.sprite);
  }

  update() {
    // Map objects first
    this.boulder.update(this.playerController.sprite);

    // Update the Player (calls update in player controller)
    this.playerController.update();

    // Update the items
    this.item.update();
    this.item2.update();
  }

  render() {
    this.game.debug.body(this.playerController.sprite);
  }
}

export default HeroHome;
