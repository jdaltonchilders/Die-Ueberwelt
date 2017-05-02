/*jshint esversion: 6 */

import store from "../store";
import AudioManager from "../utilities/audio-manager";

export default class GhostCaptain {
  constructor(game, x, y) {
    this.game = game;

    const spawnX = x || 0;
    const spawnY = y || 0;

    // Create the monster sprite
    this.sprite = this.game.add.sprite(spawnX, spawnY, "ghosts");
    this.sprite.anchor.set(0.5, 0.5);
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setSize(30, 35, 16, 25);

    // Create animations
    this.sprite.animations.add("up", [39, 40, 41, 40], 6, true);
    this.sprite.animations.add("right", [27, 28, 29, 28], 6, true);
    this.sprite.animations.add("left", [15, 16, 17, 16], 6, true);
    this.sprite.animations.add("down", [3, 4, 5, 4], 6, true);
    this.sprite.frame = 3;

    // Configure monster
    this.fireRate = 3000;
    this.nextFire = this.game.time.now + this.fireRate;
    this.attackRange = 40;
    this.damage = 25;
    this.movementSpeed = 30;
    this.idealDistance = 30;
    this.buffer = 5;
    this.spotted = false;
    this.visibleRange = 300;

    // Audio
    this.audioManager = new AudioManager(this.game);
  }

  update() {
    const topRight = this.game.math.degToRad(315);
    const topLeft = this.game.math.degToRad(225);
    const bottomLeft = this.game.math.degToRad(135);
    const bottomRight = this.game.math.degToRad(45);

    // Get angle and distance between target and boss
    var distance = this.game.math.distance(
      this.sprite.x,
      this.sprite.y,
      this.target.x,
      this.target.y
    );
    var targetAngle = this.game.math.angleBetween(
      this.sprite.x,
      this.sprite.y,
      this.target.x,
      this.target.y
    );
    if (targetAngle < 0) targetAngle += this.game.math.degToRad(360);

    // Skip if we can't see player yet
    if (!this.spotted) return;
    else {
      if (!this.hasNoticed) {
        this.audioManager.play("ghost_notice");
        this.hasNoticed = true;
      }
    }

    // Determine the direction to target
    var direction = "right";
    if (targetAngle > bottomRight && targetAngle < bottomLeft)
      direction = "down";
    else if (targetAngle > bottomLeft && targetAngle < topLeft)
      direction = "left";
    else if (targetAngle > topLeft && targetAngle < topRight) direction = "up";

    // Move toward player if we need to
    if (distance > this.idealDistance) {
      if (direction === "right") this.moveRight();
      else if (direction === "down") this.moveDown();
      else if (direction === "left") this.moveLeft();
      else if (direction === "up") this.moveUp();
    } else if (distance < this.idealDistance - this.buffer) {
      // Or move away from player
      if (direction === "right") this.moveLeft(true);
      else if (direction === "down") this.moveUp(true);
      else if (direction === "left") this.moveRight(true);
      else if (direction === "up") this.moveDown(true);
    } else {
      // Stop moving if we're at the right distance
      this.stopMoving();

      // Face appropriately
      if (direction === "right") this.faceRight();
      else if (direction === "down") this.faceDown();
      else if (direction === "left") this.faceLeft();
      else if (direction === "up") this.faceUp();
    }

    // Collide with player bullets
    this.game.physics.arcade.overlap(
      this.sprite,
      this.playerBullets,
      this.onHit,
      null,
      this
    );

    // Always try to attack
    this.fire();
  }

  fire() {
    // If enough time has past since the last bullet firing
    if (
      this.game.time.now > this.nextFire &&
      this.sprite.alive &&
      this.target.alive &&
      this.game.math.distance(
        this.sprite.x,
        this.sprite.y,
        this.target.x,
        this.target.y
      ) < this.attackRange
    ) {
      // Then hurt the player (we're melee, not ranged)
      this.target.controller.hurt(this.damage);

      // Delay next attack opportunity
      this.nextFire = this.game.time.now + this.fireRate;
    }
  }

  setPlayerBullets(bullets) {
    this.playerBullets = bullets;
  }

  setTarget(sprite) {
    this.target = sprite;
  }

  moveDown(inverted) {
    if (!inverted) this.sprite.animations.play(`down`, null, true);
    else this.sprite.animations.play(`up`, null, true);
    this.sprite.body.velocity.y = this.movementSpeed;
    this.sprite.body.velocity.x = 0;
  }

  moveLeft(inverted) {
    if (!inverted) this.sprite.animations.play(`left`, null, true);
    else this.sprite.animations.play(`right`, null, true);
    this.sprite.body.velocity.x = -this.movementSpeed;
    this.sprite.body.velocity.y = 0;
  }

  moveRight(inverted) {
    if (!inverted) this.sprite.animations.play(`right`, null, true);
    else this.sprite.animations.play(`left`, null, true);
    this.sprite.body.velocity.x = this.movementSpeed;
    this.sprite.body.velocity.y = 0;
  }

  moveUp(inverted) {
    if (!inverted) this.sprite.animations.play(`up`, null, true);
    else this.sprite.animations.play(`down`, null, true);
    this.sprite.body.velocity.y = -this.movementSpeed;
    this.sprite.body.velocity.x = 0;
  }

  stopMoving() {
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
  }

  faceDown() {
    this.sprite.frame = 3;
    this.sprite.animations.stop();
  }

  faceLeft() {
    this.sprite.frame = 15;
    this.sprite.animations.stop();
  }

  faceRight() {
    this.sprite.frame = 27;
    this.sprite.animations.stop();
  }

  faceUp() {
    this.sprite.frame = 39;
    this.sprite.animations.stop();
  }

  onHit(sprite, bullet) {
    // Enemy Strike Sound
    this.audioManager.play("strikeEnemy", false, 0, 0.5);

    // Bullets pass through ghosts
    // bullet.kill();
  }
}
