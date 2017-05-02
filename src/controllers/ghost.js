/*jshint esversion: 6 */

import store from "../store";
import HealthBar from "../gui/healthbar";
import AudioManager from "../utilities/audio-manager";

export default class Ghost {
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
    this.sprite.animations.add("up", [36, 37, 38, 37], 6, true);
    this.sprite.animations.add("right", [24, 25, 26, 25], 6, true);
    this.sprite.animations.add("left", [12, 13, 14, 13], 6, true);
    this.sprite.animations.add("down", [0, 1, 2, 1], 6, true);

    // Configure monster
    this.fireRate = 300;
    this.nextFire = this.game.time.now + this.fireRate;
    this.attackRange = 40;
    this.damage = 2;
    this.movementSpeed = 75;
    this.idealDistance = 30;
    this.buffer = 5;
    this.maxHealth = 50;
    this.health = this.maxHealth;
    this.spotted = false;
    this.visibleRange = 250;

    // Now create health bar
    this.healthBar = new HealthBar(this.game, {
      x: this.sprite.x,
      y: this.sprite.y,
      isFixedToCamera: false,
      width: this.sprite.body.width,
      height: 8
    });
    this.healthBar.setPercent(100 * this.health / this.maxHealth);

    // Audio
    this.audioManager = new AudioManager(this.game);
  }

  update() {
    // Relocate healthbar
    this.healthBar.setPosition(
      this.sprite.x,
      this.sprite.y - this.sprite.body.height / 2
    );

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
    // TODO: Should we use drag instead here?
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
  }

  faceDown() {
    this.sprite.frame = 0;
    this.sprite.animations.stop();
  }

  faceLeft() {
    this.sprite.frame = 12;
    this.sprite.animations.stop();
  }

  faceRight() {
    this.sprite.frame = 24;
    this.sprite.animations.stop();
  }

  faceUp() {
    this.sprite.frame = 36;
    this.sprite.animations.stop();
  }

  onHit(sprite, bullet) {
    this.health -= store.damage;
    this.healthBar.setPercent(100 * this.health / this.maxHealth);

    // Enemy Strike Sound
    this.audioManager.play("strikeEnemy", false, 0, 0.5);

    if (this.health <= 0) {
      this.health = 0;
      sprite.kill();
      this.healthBar.kill();
    }

    // Bullets pass through ghosts
    // bullet.kill();
  }
}
