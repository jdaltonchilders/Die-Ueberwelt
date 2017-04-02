/*jshint esversion: 6 */

class HeroIsland extends Phaser.State {
  constructor() {
    // Exception thrown here when not called
    super();

    // Tile Map
    this.map = null;

    // Tile Map Layers
    this.sky = null;
    this.islandSide = null;
    this.ground = null;
    this.roads = null;
    this.water = null;
    this.bridges = null;
    this.fences = null;
    this.graveyard = null;
    this.houses = null;
    this.items = null;
    this.doors = null;
    this.trees = null;
  }

  preload() {
    // Load Tilemap
    this.game.load.tilemap('heroIsland', 'assets/maps/HeroIsland.json', null, Phaser.Tilemap.TILED_JSON);

    // Load Tilesets
    this.game.load.image('tiles_doors', 'assets/images/tiles/doors.png');
    this.game.load.image('tiles_house', 'assets/images/tiles/house.png');
    this.game.load.image('tiles_outside', 'assets/images/tiles/outside.png');
    this.game.load.image('tiles_outside_custom', 'assets/images/tiles/outside_custom.png');
    this.game.load.image('tiles_water', 'assets/images/tiles/water.png');
    this.game.load.image('tiles_sky', 'assets/images/tiles/sky.png');
  }

  create() {
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

    // Resize game world to match the floor (DOESN'T SEEM TO WORK RIGHT NOW)
    this.ground.resizeWorld();
    // TODO: Add collision layer to map
    // TODO: Add collision detection
  }
}

export default HeroIsland;
