import store from '../store';

export default class Player {
  constructor(game, x, y) {
    this.game = game;

    const spawnX = x || 0;
    const spawnY = y || 0;

    // Create the player sprite
    this.sprite = this.game.add.sprite(spawnX, spawnY, 'player');
    this.sprite.anchor.set(0.5, 0.5);
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;

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

    // Horizontal motion
    if (keyA.isDown) {
      if (keyW.isDown || keyS.isDown) {
        this.sprite.body.velocity.x = (-store.speed) / Math.sqrt(2);
      } else {
        this.sprite.body.velocity.x = -store.speed;
      }
    } else if (keyD.isDown) {
      if (keyW.isDown || keyS.isDown) {
        this.sprite.body.velocity.x = store.speed / Math.sqrt(2);
      } else {
        this.sprite.body.velocity.x = store.speed;
      }
    } else {
      // TODO: Should we use drag instead here?
      this.sprite.body.velocity.x = 0;
    }

    // Vertical motion
    if (keyW.isDown) {
      // Are we also moving sideways?
      if (keyA.isDown) {
        this.sprite.body.velocity.y = (-store.speed) / Math.sqrt(2);
      } else if (keyD.isDown) {
        this.sprite.body.velocity.y = (-store.speed) / Math.sqrt(2);
      } else {
        this.sprite.body.velocity.y = -store.speed;
      }
    } else if (keyS.isDown) {
      // Are we also moving sideways?
      if (keyA.isDown) {
        this.sprite.body.velocity.y = store.speed / Math.sqrt(2);
      } else if (keyD.isDown) {
        this.sprite.body.velocity.y = store.speed / Math.sqrt(2);
      } else {
        this.sprite.body.velocity.y = store.speed;
      }
    } else {
      // TODO: Should we use drag instead here?
      this.sprite.body.velocity.y = 0;
    }

    // Stop motion
    if (!keyA.isDown && !keyD.isDown && !keyW.isDown && !keyS.isDown) {
      //  Stand still
      this.sprite.animations.stop();
      this.sprite.frame = 4;
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
