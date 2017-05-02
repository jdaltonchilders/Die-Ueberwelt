/*jshint esversion: 6 */

import AudioManager from "../utilities/audio-manager";
import Player from "../controllers/player";
import Shoes from "../items/shoes";
import Treant from "../controllers/treant";
import Wolf from "../controllers/wolf";
import store from "../store";

export default class AncientForest extends Phaser.State {
  constructor() {
    // Exception thrown here when not called
    super();
  }

  preload() {
    // Load Tilemap
    this.game.load.tilemap(
      "ancientForest",
      "assets/maps/ancientForest.json",
      null,
      Phaser.Tilemap.TILED_JSON
    );

    // Load Tilesets
    this.game.load.image("tiles_doors", "assets/images/tiles/doors.png");
    this.game.load.image("tiles_castle", "assets/images/tiles/castle.png");
    this.game.load.image("tiles_outside", "assets/images/tiles/outside.png");
    this.game.load.image(
      "tiles_outside_custom",
      "assets/images/tiles/outside_custom.png"
    );
    this.game.load.image("tiles_sky", "assets/images/tiles/sky.png");
  }

  create() {
    // Audio
    this.audioManager = new AudioManager(this.game);
    this.audioManager.play("forestBackground", true, 0, 0.2, false);

    // Set Background color
    this.game.stage.backgroundColor = "#55b4ff";

    // Enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Create the Map
    this.map = this.game.add.tilemap("ancientForest");
    this.map.addTilesetImage("doors", "tiles_doors");
    this.map.addTilesetImage("castle", "tiles_castle");
    this.map.addTilesetImage("outside", "tiles_outside");
    this.map.addTilesetImage("outside_custom", "tiles_outside_custom");
    this.map.addTilesetImage("sky", "tiles_sky");

    // Create layers
    this.sky = this.map.createLayer("Sky");
    this.islandSide = this.map.createLayer("IslandSide");
    this.ground = this.map.createLayer("Ground");
    this.road = this.map.createLayer("Road");
    this.bridges = this.map.createLayer("Bridges");
    this.castle = this.map.createLayer("Castle");
    this.door = this.map.createLayer("Door");
    this.trees = this.map.createLayer("TreeTrunks");
    this.collisionLayer = this.map.createLayer("CollisionLayer");

    // Create Collision Trigger Layer
    this.enterForest = this.map.objects.CollisionTrigger.find(
      object => object.name == "EnterForest"
    );
    this.exitForest = this.map.objects.CollisionTrigger.find(
      object => object.name == "ExitForest"
    );
    this.enterTheDungeon = this.map.objects.CollisionTrigger.find(
      object => object.name == "EnterTheDungeon"
    );
    this.returnFromDungeon = this.map.objects.CollisionTrigger.find(
      object => object.name == "ReturnFromDungeon"
    );

    // Create Collision Trigger Layer Rect
    this.enterForestRect = new Phaser.Rectangle(
      this.enterForest.x,
      this.enterForest.y,
      this.enterForest.width,
      this.enterForest.height
    );
    this.exitForestRect = new Phaser.Rectangle(
      this.exitForest.x,
      this.exitForest.y,
      this.exitForest.width,
      this.exitForest.height
    );
    this.enterTheDungeonRect = new Phaser.Rectangle(
      this.enterTheDungeon.x,
      this.enterTheDungeon.y,
      this.enterTheDungeon.width,
      this.enterTheDungeon.height
    );
    this.returnFromDungeonRect = new Phaser.Rectangle(
      this.returnFromDungeon.x,
      this.returnFromDungeon.y,
      this.returnFromDungeon.width,
      this.returnFromDungeon.height
    );

    // Resize game world to match the floor (DOESN'T SEEM TO WORK RIGHT NOW)
    this.ground.resizeWorld();

    // Set the Spawn Point for this State
    if (store.previousState === "HeroIsland") {
      this.spawn = this.enterForestRect;
    } else if (store.previousState === "DungeonLevelOne") {
      this.spawn = this.returnFromDungeonRect;
    } else {
      this.spawn = this.enterForestRect;
    }

    // Create the monsters
    this.monsters = [
      new Treant(this.game, 140, 420),
      new Treant(this.game, 720, 120),
      new Treant(this.game, 300, 80),
      new Wolf(this.game, 200, 500),
      new Wolf(this.game, 500, 750),
      new Wolf(this.game, 800, 500)
    ];

    // Create the Player
    // We do this after monsters so the monsters will
    // appear below the player's health bar when they overlap
    this.player = new Player(this.game, this.spawn.x, this.spawn.y);

    // Finish Create Layer
    this.trees = this.map.createLayer("TreeTops");

    // Attach player parts to monster controllers
    this.monsters.forEach(monster => {
      monster.setTarget(this.player.sprite);
      monster.setPlayerBullets(this.player.bullets);
    });

    // Collide with Player
    var mapTileLength = this.map.tiles.length - 1;
    this.map.setCollisionBetween(1, mapTileLength, true, this.collisionLayer);

    // Make item
    if (store.inventory.indexOf("Shoes") === -1)
      this.item = Shoes(this.game, 4 * 32, 24 * 32, this.player.sprite);

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
      this.exitForestRect.contains(
        this.player.sprite.world.x,
        this.player.sprite.world.y
      )
    ) {
      // Update State Information
      store.previousState = "AncientForest";
      store.currentState = store.nextState = "HeroIsland";

      // Load the Hero Island State
      this.game.state.start("HeroIsland");
    }

    // Check if Dungeon Entrance contains the Player
    if (
      this.enterTheDungeonRect.contains(
        this.player.sprite.world.x,
        this.player.sprite.world.y
      )
    ) {
      // Update State Information
      store.previousState = "AncientForest";
      store.currentState = store.nextState = "DungeonLevelOne";

      // Load the Hero Island State
      this.game.state.start("DungeonLevelOne");
    }
  }

  shutdown() {
    this.game.sound.stopAll();
  }
}
