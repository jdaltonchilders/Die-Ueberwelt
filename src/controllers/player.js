/*jshint esversion: 6 */

import store from '../store';
import HealthBar from '../gui/healthbar';

export default class Player {
  constructor(game, x, y) {
    this.game = game;

    const spawnX = x || 0;
    const spawnY = y || 0;

    // Create the player sprite
    this.sprite = this.game.add.sprite(spawnX, spawnY, 'player');
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.smoothed = false;

    // Customize Physics
    this.game.physics.arcade.enable(this.sprite, true);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setSize(18, 12, 4, 28);

    // Hacky
    this.sprite.controller = this;

    // Create animations
    this.sprite.animations.add('up', [ 36, 37, 38, 37 ], 5, true);
    this.sprite.animations.add('right', [ 24, 25, 26, 25 ], 5, true);
    this.sprite.animations.add('left', [ 12, 13, 14, 13 ], 5, true);
    this.sprite.animations.add('down', [ 0, 1, 2, 1 ], 5, true);

    // Configure player
    this.nextFire = this.game.time.now + store.fireRate;
    this.bulletSpeed = 300;

    // Now create bullets group
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(30, 'bullet', 0, false);
    this.bullets.forEach(bullet => bullet.scale.set(0.5, 0.5));
    this.bullets.setAll('anchor.x', 0);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);

    // Now create health bar
    this.healthBar = new HealthBar(this.game, { x: 125, y: game.height - 20, isFixedToCamera: true });
    this.healthBar.setPercent(100 * store.health / store.maxHealth);

    // Now create items
    // HACK: This won't scale. Sorry :^) kill me
    console.log(store);
    if (store.inventory.indexOf("Pickaxe") !== -1) {
      this.pickaxe = this.game.add.sprite(16, this.game.height - 56, "Pickaxe");
      this.pickaxe.anchor.set(0.5, 0.5);
      this.pickaxe.fixedToCamera = true;
    }
  }

  update() {
    var keyA = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    var keyW = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    var keyS = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    var keyD = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

    if (keyW.isDown) {
      this.sprite.animations.play('up', null, true);
      this.sprite.body.velocity.y = -store.speed;
      this.sprite.body.velocity.x = 0;
    } else if (keyS.isDown) {
      this.sprite.animations.play('down', null, true);
      this.sprite.body.velocity.y = store.speed;
      this.sprite.body.velocity.x = 0;
    } else if (keyA.isDown) {
      this.sprite.animations.play('left', null, true);
      this.sprite.body.velocity.x = -store.speed;
      this.sprite.body.velocity.y = 0;
    } else if (keyD.isDown) {
      this.sprite.animations.play('right', null, true);
      this.sprite.body.velocity.x = store.speed;
      this.sprite.body.velocity.y = 0;
    } else {
      // TODO: Should we use drag instead here?
      this.sprite.body.velocity.x = 0;
      this.sprite.body.velocity.y = 0;
    }

    // Stop motion
    if (!keyA.isDown && !keyD.isDown && !keyW.isDown && !keyS.isDown) {
      //  Stand still
      const animationName = this.sprite.animations.currentAnim.name;
      if (animationName === 'down') {
        this.sprite.frame = 1;
      } else if (animationName === 'left') {
        this.sprite.frame = 13;
      } else if (animationName === 'right') {
        this.sprite.frame = 25;
      } else if (animationName === 'up') {
        this.sprite.frame = 37;
      }
      this.sprite.animations.stop();
    }

    // Fire if the mouse is being clicked
    if (this.game.input.activePointer.isDown) this.fire();
  }

  fire() {
    // If enough time has past since the last bullet firing
    if (this.game.time.now > this.nextFire && this.sprite.alive) {
      // Then create the bullet
      var bullet = this.bullets.getFirstExists(false);
      if (bullet) {
        // Set on player
        bullet.reset(this.sprite.x, this.sprite.y);

        // Rotate and move bullet toward mouse pointer
        bullet.rotation = this.game.physics.arcade.moveToPointer(bullet, this.bulletSpeed, this.game.input.activePointer);

        // Delay next bullet fire opportunity
        this.nextFire = this.game.time.now + store.fireRate;
      }
    }
  }

  hurt(damage) {
    store.health -= damage;
    this.healthBar.setPercent(100 * store.health / store.maxHealth);

    if (store.health < 0) {
      store.health = 0;
      this.sprite.kill();
      this.healthBar.kill();
    }
  }

  onHit(sprite, bullet) {
    this.hurt(bullet.damage);

    bullet.kill();
  }
}
