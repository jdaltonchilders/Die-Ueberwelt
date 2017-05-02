/*jshint esversion: 6 */

import AudioManager from "../utilities/audio-manager";
import Player from "../controllers/player";
import Staff from "../items/staff";
import GhostCaptain from "../controllers/ghost-captain";
import Ghost from "../controllers/ghost";
import store from "../store";

export default class DungeonLevelOne extends Phaser.State {
  constructor() {
    // Exception thrown here when not called
    super();
  }

  preload() {
    // Load Tilemap
    this.game.load.tilemap(
      "dungeonLevelOne",
      "assets/maps/dungeonLevelOne.json",
      null,
      Phaser.Tilemap.TILED_JSON
    );

    // Load Tilesets
    this.game.load.image("tiles_dungeon", "assets/images/tiles/dungeon.png");
  }

  create() {
    // Audio
    this.audioManager = new AudioManager(this.game);
    this.audioManager.play("dungeonBackground", true, 0, 0.3, false);

    // Enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Create the Map
    this.map = this.game.add.tilemap("dungeonLevelOne");
    this.map.addTilesetImage("dungeon", "tiles_dungeon");

    // Create layers
    this.ground = this.map.createLayer("Ground");
    this.road = this.map.createLayer("Cliffs");
    this.bridges = this.map.createLayer("CliffSides");
    this.door = this.map.createLayer("Doors");
    this.collisionLayer = this.map.createLayer("CollisionLayer");

    // Create Collision Trigger Layer
    this.enterTheDungeon = this.map.objects.CollisionTrigger.find(
      object => object.name == "EnterTheDungeon"
    );
    this.returnToWorld = this.map.objects.CollisionTrigger.find(
      object => object.name == "ReturnToWorld"
    );

    // Create Collision Trigger Layer Rect
    this.enterTheDungeonRect = new Phaser.Rectangle(
      this.enterTheDungeon.x,
      this.enterTheDungeon.y,
      this.enterTheDungeon.width,
      this.enterTheDungeon.height
    );
    this.returnToWorldRect = new Phaser.Rectangle(
      this.returnToWorld.x,
      this.returnToWorld.y,
      this.returnToWorld.width,
      this.returnToWorld.height
    );

    // Resize game world to match the floor (DOESN'T SEEM TO WORK RIGHT NOW)
    this.ground.resizeWorld();

    // Create the monsters
    this.monsters = [
      new GhostCaptain(this.game, 200, 500),
      new GhostCaptain(this.game, 500, 700),
      new GhostCaptain(this.game, 525, 100),
      new GhostCaptain(this.game, 800, 500),
      new Ghost(this.game, 320, 100),
      new Ghost(this.game, 375, 675),
      new Ghost(this.game, 575, 275),
      new Ghost(this.game, 880, 80)
    ];

    // Create the Player
    // We do this after monsters so the monsters will
    // appear below the player's health bar when they overlap
    this.player = new Player(
      this.game,
      this.enterTheDungeonRect.x,
      this.enterTheDungeonRect.y
    );

    // Attach player parts to monster controllers
    this.monsters.forEach(monster => {
      monster.setTarget(this.player.sprite);
      monster.setPlayerBullets(this.player.bullets);
    });

    // Collide with Player
    var mapTileLength = this.map.tiles.length - 1;
    this.map.setCollisionBetween(1, mapTileLength, true, this.collisionLayer);

    // Make item
    if (store.inventory.indexOf("Staff") === -1)
      this.item = Staff(this.game, 27.5 * 32, 4 * 32, this.player.sprite);

    // Camera follows player
    this.game.camera.follow(this.player.sprite);

    // Create health bar last of all
    this.player.createHealthBar();
  }

  update() {
    // Ray casting!
    this.monsters.filter(monster => !monster.spotted).forEach(monster => {
      var ray = new Phaser.Line(
        monster.sprite.x,
        monster.sprite.y,
        this.player.sprite.x,
        this.player.sprite.y
      );

      const tileHits = this.collisionLayer.getRayCastTiles(ray, 4, true, false);

      if (tileHits.length === 0) monster.spotted = true;
    });

    // Handle Player Update
    this.player.update();

    // Bullets shouldnt go through walls
    this.game.physics.arcade.collide(
      this.collisionLayer, // layer
      this.player.bullets,
      (bullet, layer) => {
        bullet.kill();
      }
    );

    // Item update
    if (this.item) this.item.update();

    // Collide with Layers
    this.game.physics.arcade.collide(this.player.sprite, this.collisionLayer);

    // Update all monsters
    this.monsters.forEach(monster => {
      monster.update();
      this.game.physics.arcade.collide(monster.sprite, this.collisionLayer);
    });

    // Check if Exit House contains the Player
    if (
      this.returnToWorldRect.contains(
        this.player.sprite.world.x,
        this.player.sprite.world.y
      )
    ) {
      // Update State Information
      store.previousState = "DungeonLevelOne";
      store.currentState = store.nextState = "AncientForest";

      // Load the Hero Island State
      this.game.state.start("AncientForest");
    }
  }

  shutdown() {
    this.game.sound.stopAll();
  }
}
