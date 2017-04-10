/*jshint esversion: 6 */

import store from '../store';

export default class Boss {
  constructor(game, x, y) {
    this.game = game;

    const spawnX = x || 0;
    const spawnY = y || 0;

    this.phase = 1;

    // Create the first boss sprite
    this.sprite = this.game.add.sprite(spawnX, spawnY, 'boss');
    this.sprite.anchor.set(0.5, 0.5);
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;

    // Create animations
    this.sprite.animations.add('2_up', [ 39, 40, 41, 40 ], 5, true);
    this.sprite.animations.add('2_right', [ 27, 28, 29, 28 ], 5, true);
    this.sprite.animations.add('2_left', [ 15, 16, 17, 16 ], 5, true);
    this.sprite.animations.add('2_down', [ 3, 4, 5, 4 ], 5, true);
    this.sprite.animations.add('1_up', [ 36, 37, 38, 36 ], 5, true);
    this.sprite.animations.add('1_right', [ 24, 25, 26, 25 ], 5, true);
    this.sprite.animations.add('1_left', [ 12, 13, 14, 13 ], 5, true);
    this.sprite.animations.add('1_down', [ 0, 1, 2, 1 ], 5, true);

    // Configure player
    this.nextFire = this.game.time.now + store.fireRate;
    this.bulletspeed = 700;

    // Now create bullets groups
    this.waterBullets = this.game.add.group();
    this.waterBullets.enableBody = true;
    this.waterBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.waterBullets.createMultiple(30, 'boss1bullet', 0, false);
    this.waterBullets.forEach(bullet => bullet.scale.set(0.5, 0.5));
    this.waterBullets.setAll('anchor.x', 0);
    this.waterBullets.setAll('anchor.y', 0.5);
    this.waterBullets.setAll('outOfBoundsKill', true);
    this.waterBullets.setAll('checkWorldBounds', true);
    this.waterBullets.callAll('animations.add', 'animations', 'move', [ 0, 1, 2, 3 ], 7, true);

    this.fireBullets = this.game.add.group();
    this.fireBullets.enableBody = true;
    this.fireBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.fireBullets.createMultiple(30, 'boss2bullet', 0, false);
    this.fireBullets.forEach(bullet => bullet.scale.set(0.5, 0.5));
    this.fireBullets.setAll('anchor.x', 0);
    this.fireBullets.setAll('anchor.y', 0.5);
    this.fireBullets.setAll('outOfBoundsKill', true);
    this.fireBullets.setAll('checkWorldBounds', true);
    this.fireBullets.callAll('animations.add', 'animations', 'move', [ 0, 1, 2, 3 ], 7, true);
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

    // Move toward player if we need to
    if (distance > idealDistance) {
      if (targetAngle < bottomRight) {
        this.moveRight();
      } else if (targetAngle > bottomRight && targetAngle < bottomLeft) {
        this.moveDown();
      } else if (targetAngle > bottomLeft && targetAngle < topLeft) {
        this.moveLeft();
      } else if (targetAngle > topLeft && targetAngle < topRight) {
        this.moveUp();
      } else {
        this.moveRight();
      }
    } else {
      // Stop moving if we're at the right distance
      this.stopMoving();

      // Face appropriately
      if (targetAngle < bottomRight) {
        this.faceRight();
      } else if (targetAngle > bottomRight && targetAngle < bottomLeft) {
        this.faceDown();
      } else if (targetAngle > bottomLeft && targetAngle < topLeft) {
        this.faceLeft();
      } else if (targetAngle > topLeft && targetAngle < topRight) {
        this.faceUp();
      } else {
        this.faceRight();
      }
    }

    // Always try to attack
    this.fire();
  }

  fire() {
    // If enough time has past since the last bullet firing
    if (this.game.time.now > this.nextFire) {
      // Then create the bullet
      var bullet = undefined;
      if (this.phase === 1) bullet = this.waterBullets.getFirstExists(false);
      else bullet = this.fireBullets.getFirstExists(false);

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
    this.sprite.animations.play(`${this.phase}_down`, null, true);
    this.sprite.body.velocity.y = store.speed;
    this.sprite.body.velocity.x = 0;
  }

  moveLeft() {
    this.sprite.animations.play(`${this.phase}_left`, null, true);
    this.sprite.body.velocity.x = -store.speed;
    this.sprite.body.velocity.y = 0;
  }

  moveRight() {
    this.sprite.animations.play(`${this.phase}_right`, null, true);
    this.sprite.body.velocity.x = store.speed;
    this.sprite.body.velocity.y = 0;
  }

  moveUp() {
    this.sprite.animations.play(`${this.phase}_up`, null, true);
    this.sprite.body.velocity.y = -store.speed;
    this.sprite.body.velocity.x = 0;
  }

  stopMoving() {
    // TODO: Should we use drag instead here?
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
  }

  faceDown() {
    if (this.phase === 1) this.sprite.frame = 1;
    else this.sprite.frame = 4;
    this.sprite.animations.stop();
  }

  faceLeft() {
    if (this.phase === 1) this.sprite.frame = 13;
    else this.sprite.frame = 16;
    this.sprite.animations.stop();
  }

  faceRight() {
    if (this.phase === 1) this.sprite.frame = 25;
    else this.sprite.frame = 28;
    this.sprite.animations.stop();
  }

  faceUp() {
    if (this.phase === 1) this.sprite.frame = 37;
    else this.sprite.frame = 40;
    this.sprite.animations.stop();
  }
}
