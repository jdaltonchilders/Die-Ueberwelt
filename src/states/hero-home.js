/*jshint esversion: 6 */

var map;
var floor;
var walls;
var underFurnitre;
var furniture;
var items;
var aboveFurniture;
var ceiling;

class HeroHome extends Phaser.State {
  preload() {
    // Load Tilemap
    this.game.load.tilemap('heroHome', 'assets/maps/HeroHome.json', null, Phaser.Tilemap.TILED_JSON);

    // Load Tilesets
    this.game.load.image('tiles_inside', 'assets/images/tiles/inside.png');
    this.game.load.image('tiles_inside_ceiling', 'assets/images/tiles/inside_changed.png');
  }

  create() {
    // Create the Map
    map = this.game.add.tilemap('heroHome');
    map.addTilesetImage('inside', 'tiles_inside');
    map.addTilesetImage('inside_changed', 'tiles_inside_ceiling');

    // Create layers
    floor = map.createLayer('Floor');
    walls = map.createLayer('Walls');
    underFurnitre = map.createLayer('UnderFurniture');
    furniture = map.createLayer('Furniture');
    items = map.createLayer('Items');
    aboveFurniture = map.createLayer('AboveFurniture');
    ceiling = map.createLayer('Ceiling');

    // Resize game world to match the floor
    floor.resizeWorld();
  }
}

export default HeroHome;
