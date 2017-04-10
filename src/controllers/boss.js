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
    this.bulletSpeed = 700;

    // Now create bullets group
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(30, 'boss1bullet', 0, false);
    this.bullets.forEach(bullet => bullet.scale.set(0.5, 0.5));
    this.bullets.setAll('anchor.x', 0);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.callAll('animations.add', 'animations', 'move', [ 0, 1, 2, 3 ], 7, true);
  }

  update() {
    const idealDistance = 100;
    const topRight = this.game.math.degToRad(315);
    const topLeft = this.game.math.degToRad(225);
    const bottomLeft = this.game.math.degToRad(135);
    const bottomRight = this.game.math.degToRad(45);

    // Get angle and distance between target and boss
    var distance = this.game.math.distance(this.sprite.x, this.sprite.y, this.target.x, this.target.y);
    var targetAngle = this.game.math.angleBetween(this.sprite.x, this.sprite.y, this.target.x, this.target.y);
    if (targetAngle < 0) targetAngle += this.game.math.degToRad(360);

    // Face and move appropriately
    if (targetAngle < bottomRight) {
      this.faceRight();
      if (distance > idealDistance) this.moveRight();
    } else if (targetAngle > bottomRight && targetAngle < bottomLeft) {
      this.faceDown();
      if (distance > idealDistance) this.moveDown();
    } else if (targetAngle > bottomLeft && targetAngle < topLeft) {
      this.faceLeft();
      if (distance > idealDistance) this.moveLeft();
    } else if (targetAngle > topLeft && targetAngle < topRight) {
      this.faceUp();
      if (distance > idealDistance) this.moveUp();
    } else {
      this.faceRight();
      if (distance > idealDistance) this.moveRight();
    }

    if (distance <= idealDistance) {
      this.stopMoving();
    }

    // Always try to attack
    this.fire();
  }

  fire() {
    // If enough time has past since the last bullet firing
    if (this.game.time.now > this.nextFire) {
      // Then create the bullet
      var bullet = this.bullets.getFirstExists(false);
      if (bullet) {
        // Set on sprite
        bullet.reset(this.sprite.x, this.sprite.y);
        bullet.anchor.set(0.5, 0.5);

        // Move bullet toward target
        this.game.physics.arcade.moveToObject(bullet, this.target, this.bulletSpeed, 2000);
        bullet.animations.play('move');

        // Delay next bullet fire opportunity
        this.nextFire = this.game.time.now + store.fireRate;
      }
    }
  }

  setTarget(sprite) {
    this.target = sprite;
  }

  moveDown() {
    this.sprite.animations.play('down', null, true);
    this.sprite.body.velocity.y = store.speed;
    this.sprite.body.velocity.x = 0;
  }

  moveLeft() {
    this.sprite.animations.play('left', null, true);
    this.sprite.body.velocity.x = -store.speed;
    this.sprite.body.velocity.y = 0;
  }

  moveRight() {
    this.sprite.animations.play('right', null, true);
    this.sprite.body.velocity.x = store.speed;
    this.sprite.body.velocity.y = 0;
  }

  moveUp() {
    this.sprite.animations.play('up', null, true);
    this.sprite.body.velocity.y = -store.speed;
    this.sprite.body.velocity.x = 0;
  }

  stopMoving() {
    // TODO: Should we use drag instead here?
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
  }

  faceDown() {
    this.sprite.frame = 1;
    this.sprite.animations.stop();
  }

  faceLeft() {
    this.sprite.frame = 13;
    this.sprite.animations.stop();
  }

  faceRight() {
    this.sprite.frame = 25;
    this.sprite.animations.stop();
  }

  faceUp() {
    this.sprite.frame = 37;
    this.sprite.animations.stop();
  }
}
