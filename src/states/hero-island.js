/*jshint esversion: 6 */

import Player from '../controllers/player';
import store from '../store';

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

        // Create Collision Trigger Layer
        this.enterHeroHouse = this.map.objects.CollisionTrigger.find(object => object.name == 'EnterHeroHouse');
        this.returnFromHeroHouse = this.map.objects.CollisionTrigger.find(object => object.name == 'ReturnFromHeroHouse');

        this.enterBlackHouse = this.map.objects.CollisionTrigger.find(object => object.name == 'EnterBlackHouse');
        this.returnFromBlackHouse = this.map.objects.CollisionTrigger.find(object => object.name == 'ReturnFromBlackHouse');

        this.enterGreenHouse = this.map.objects.CollisionTrigger.find(object => object.name == 'EnterGreenHouse');
        this.returnFromGreenHouse = this.map.objects.CollisionTrigger.find(object => object.name == 'ReturnFromGreenHouse');

        this.enterGreyHouse = this.map.objects.CollisionTrigger.find(object => object.name == 'EnterGreyHouse');
        this.returnFromGreyHouse = this.map.objects.CollisionTrigger.find(object => object.name == 'ReturnFromGreyHouse');

        this.enterRedCabin = this.map.objects.CollisionTrigger.find(object => object.name == 'EnterRedCabin');
        this.returnFromRedCabin = this.map.objects.CollisionTrigger.find(object => object.name == 'ReturnFromRedCabin');

        this.enterGreyCabin = this.map.objects.CollisionTrigger.find(object => object.name == 'EnterGreyCabin');
        this.returnFromGreyCabin = this.map.objects.CollisionTrigger.find(object => object.name == 'ReturnFromGreyCabin');

        this.enterTealCabin = this.map.objects.CollisionTrigger.find(object => object.name == 'EnterTealCabin');
        this.returnFromTealCabin = this.map.objects.CollisionTrigger.find(object => object.name == 'ReturnFromTealCabin');

        this.bossFight = this.map.objects.CollisionTrigger.find(object => object.name == 'BossFight');

        this.enterAncientForest = this.map.objects.CollisionTrigger.find(object => object.name == 'EnterAncientForest');
        this.returnFromAncientForest = this.map.objects.CollisionTrigger.find(object => object.name == 'ReturnFromAncientForest');

        this.respawnPoint = this.map.objects.CollisionTrigger.find(object => object.name == 'RespawnPoint');

        // Create Collision Trigger Layer Rect
        this.enterHeroHouseRect = new Phaser.Rectangle(this.enterHeroHouse.x, this.enterHeroHouse.y, this.enterHeroHouse.width, this.enterHeroHouse.height);
        this.returnFromHeroHouseRect = new Phaser.Rectangle(this.returnFromHeroHouse.x, this.returnFromHeroHouse.y, this.returnFromHeroHouse.width, this.returnFromHeroHouse.height);

        this.enterBlackHouseRect = new Phaser.Rectangle(this.enterBlackHouse.x, this.enterBlackHouse.y, this.enterBlackHouse.width, this.enterBlackHouse.height);
        this.returnFromBlackHouseRect = new Phaser.Rectangle(this.returnFromBlackHouse.x, this.returnFromBlackHouse.y, this.returnFromBlackHouse.width, this.returnFromBlackHouse.height);

        this.enterGreenHouseRect = new Phaser.Rectangle(this.enterGreenHouse.x, this.enterGreenHouse.y, this.enterGreenHouse.width, this.enterGreenHouse.height);
        this.returnFromGreenHouseRect = new Phaser.Rectangle(this.returnFromGreenHouse.x, this.returnFromGreenHouse.y, this.returnFromGreenHouse.width, this.returnFromGreenHouse.height);

        this.enterGreyHouseRect = new Phaser.Rectangle(this.enterGreyHouse.x, this.enterGreyHouse.y, this.enterGreyHouse.width, this.enterGreyHouse.height);
        this.returnFromGreyHouseRect = new Phaser.Rectangle(this.returnFromGreyHouse.x, this.returnFromGreyHouse.y, this.returnFromGreyHouse.width, this.returnFromGreyHouse.height);

        this.enterRedCabinRect = new Phaser.Rectangle(this.enterRedCabin.x, this.enterRedCabin.y, this.enterRedCabin.width, this.enterRedCabin.height);
        this.returnFromRedCabinRect = new Phaser.Rectangle(this.returnFromRedCabin.x, this.returnFromRedCabin.y, this.returnFromRedCabin.width, this.returnFromRedCabin.height);

        this.enterGreyCabinRect = new Phaser.Rectangle(this.enterGreyCabin.x, this.enterGreyCabin.y, this.enterGreyCabin.width, this.enterGreyCabin.height);
        this.returnFromGreyCabinRect = new Phaser.Rectangle(this.returnFromGreyCabin.x, this.returnFromGreyCabin.y, this.returnFromGreyCabin.width, this.returnFromGreyCabin.height);

        this.enterTealCabinRect = new Phaser.Rectangle(this.enterTealCabin.x, this.enterTealCabin.y, this.enterTealCabin.width, this.enterTealCabin.height);
        this.returnFromTealCabinRect = new Phaser.Rectangle(this.returnFromTealCabin.x, this.returnFromTealCabin.y, this.returnFromTealCabin.width, this.returnFromTealCabin.height);

        this.bossFightRect = new Phaser.Rectangle(this.bossFight.x, this.bossFight.y, this.bossFight.width, this.bossFight.height);

        this.enterAncientForestRect = new Phaser.Rectangle(this.enterAncientForest.x, this.enterAncientForest.y, this.enterAncientForest.width, this.enterAncientForest.height);
        this.returnFromAncientForestRect = new Phaser.Rectangle(this.returnFromAncientForest.x, this.returnFromAncientForest.y, this.returnFromAncientForest.width, this.returnFromAncientForest.height);

        this.respawnPointRect = new Phaser.Rectangle(this.respawnPoint.x, this.respawnPoint.y, this.respawnPoint.width, this.respawnPoint.height);

        // Create Tilesets
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
        this.treesTrunk = this.map.createLayer('TreesTrunk');

        // Resize game world to match the floor (DOESN'T SEEM TO WORK RIGHT NOW)
        this.ground.resizeWorld();

        // Set the Spawn Point for this State
        if (store.previousState === 'HeroHome') {
            this.spawn = this.returnFromHeroHouseRect
        } else if (store.previousState === 'BlackHome') {
            this.spawn = this.returnFromBlackHouseRect
        } else if (store.previousState === 'GreenHome') {
            this.spawn = this.returnFromGreenHouseRect
        } else if (store.previousState === 'GreyHome') {
            this.spawn = this.returnFromGreyHouseRect
        } else if (store.previousState === 'RedCabin') {
            this.spawn = this.returnFromRedCabinRect
        } else if (store.previousState === 'GreyCabin') {
            this.spawn = this.returnFromGreyCabinRect
        } else if (store.previousState === 'TealCabin') {
            this.spawn = this.returnFromTealCabinRect
        } else if (store.previousState === 'AncientForest') {
            this.spawn = this.returnFromAncientForestRect
        } else if (store.previousState === 'DeathScreen') {
            this.spawn = this.respawnPointRect
        } else {
            this.spawn = this.respawnPointRect
        }


        // Create the Player
        this.player = new Player(this.game, this.spawn.x, this.spawn.y);

        // Finish Create Layers
        this.housesRoof = this.map.createLayer('HousesRoof');
        this.trees = this.map.createLayer('Trees');
        this.collisionLayer = this.map.createLayer('CollisionLayer');


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

        /**
         * Use this.player.sprite.world.x/y to get position
         */

        // Check if Enter Hero House contains the Player
        if (this.enterHeroHouseRect.contains(this.player.sprite.world.x, this.player.sprite.world.y)) {
            // Fix up state info in Store
            store.previousState = 'HeroIsland';
            store.currentState = store.nextState = 'HeroHome';

            // Load the Hero Island State
            this.game.state.start('HeroHome');
        }

        // Check if Enter Black House contains the Player
        if (this.enterBlackHouseRect.contains(this.player.sprite.world.x, this.player.sprite.world.y)) {
            // Fix up state info in Store
            store.previousState = 'HeroIsland';
            store.currentState = store.nextState = 'BlackHome';

            // Load the Hero Island State
            this.game.state.start('BlackHome');
        }

        // Check if Enter Green House contains the Player
        if (this.enterGreenHouseRect.contains(this.player.sprite.world.x, this.player.sprite.world.y)) {
            // Fix up state info in Store
            store.previousState = 'HeroIsland';
            store.currentState = store.nextState = 'GreenHome';

            // Load the Hero Island State
            this.game.state.start('GreenHome');
        }

        // Check if Enter Grey House contains the Player
        if (this.enterGreyHouseRect.contains(this.player.sprite.world.x, this.player.sprite.world.y)) {
            // Fix up state info in Store
            store.previousState = 'HeroIsland';
            store.currentState = store.nextState = 'GreyHome';

            // Load the Hero Island State
            this.game.state.start('GreyHome');
        }

        // Check if Enter Red Cabin contains the Player
        if (this.enterRedCabinRect.contains(this.player.sprite.world.x, this.player.sprite.world.y)) {
            // Fix up state info in Store
            store.previousState = 'HeroIsland';
            store.currentState = store.nextState = 'RedCabin';

            // Load the Hero Island State
            this.game.state.start('RedCabin');
        }

        // Check if Enter Grey Cabin contains the Player
        if (this.enterGreyCabinRect.contains(this.player.sprite.world.x, this.player.sprite.world.y)) {
            // Fix up state info in Store
            store.previousState = 'HeroIsland';
            store.currentState = store.nextState = 'GreyCabin';

            // Load the Hero Island State
            this.game.state.start('GreyCabin');
        }

        // Check if Enter Teal Cabin contains the Player
        if (this.enterTealCabinRect.contains(this.player.sprite.world.x, this.player.sprite.world.y)) {
            // Fix up state info in Store
            store.previousState = 'HeroIsland';
            store.currentState = store.nextState = 'TealCabin';

            // Load the Hero Island State
            this.game.state.start('TealCabin');
        }

        // Check if Boss Fight contains the Player
        if (this.bossFightRect.contains(this.player.sprite.world.x, this.player.sprite.world.y)) {
            // Fix up state info in Store
            store.previousState = 'HeroIsland';
            store.currentState = store.nextState = 'BossFight';

            // Load the Boss Fight State
            this.game.state.start('BossFight');
        }

        // Check if Ancient Forest contains the Player
        if (this.enterAncientForestRect.contains(this.player.sprite.world.x, this.player.sprite.world.y)) {
            // Fix up state info in Store
            store.previousState = 'HeroIsland';
            store.currentState = store.nextState = 'AncientForest';

            // Load the Ancient Forest State
            this.game.state.start('AncientForest');
        }
    }

    shutdown() {
        this.game.sound.stopAll();
    }
}