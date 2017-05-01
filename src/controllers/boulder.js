/*jshint esversion: 6 */

import store from "../store";

export default class Boulder {
  constructor(game, x, y) {
    this.game = game;

    const spawnX = x || 0;
    const spawnY = y || 0;

    // Create the player sprite
    this.sprite = this.game.add.sprite(spawnX, spawnY, "boulder");
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.smoothed = false;

    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.immovable = true;
  }

  update(player, bullets) {
    var keySpace = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.game.physics.arcade.collide(player, this.sprite);

    if (keySpace.isDown) {
      if (
        store.inventory.indexOf("Pickaxe" !== -1) &&
        this.game.physics.arcade.distanceBetween(player, this.sprite) < 50
      ) {
        this.sprite.kill();
      }
    }

    // Lol demo soon
    bullets.forEach(bullet => {
      this.game.physics.arcade.overlap(
        bullet,
        this.sprite,
        (bullet, boulder) => {
          bullet.kill();
        }
      );
    });
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
        bullet.rotation = this.game.physics.arcade.moveToPointer(
          bullet,
          this.bulletSpeed,
          this.game.input.activePointer
        );

        // Delay next bullet fire opportunity
        this.nextFire = this.game.time.now + store.fireRate;
      }
    }
  }
}
