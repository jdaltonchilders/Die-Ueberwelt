/*jshint esversion: 6 */

import store from '../store';

export default class Boss {
  constructor(game, x, y) {
    this.game = game;

    const spawnX = x || 0;
    const spawnY = y || 0;

    // Create the first boss sprite
    this.sprite = this.game.add.sprite(spawnX, spawnY, 'boss1');
    this.sprite.anchor.set(0.5, 0.5);
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;

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
    if (this.game.time.now > this.nextFire) {
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
}
