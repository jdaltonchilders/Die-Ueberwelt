/*jshint esversion: 6 */

import store from '../store';

export default class Item {
  constructor(game, x, y, name, spriteKey, player) {
    this.game = game;
    this.name = name;
    this.player = player;

    const spawnX = x || 0;
    const spawnY = y || 0;

    this.sprite = this.game.add.sprite(spawnX, spawnY, spriteKey);
    this.sprite.anchor.set(0.5, 0.5);
    this.game.physics.arcade.enable(this.sprite);

    this.collectible = true;
  }

  preload() {
    // Load Audio
    this.game.load.audio('item_pickup', 'assets/audio/action/item_pickup.ogg');
  }

  create() {
    // Create Audio for item pickup
    this.itemPickup = this.game.add.audio('item_pickup');
  }

  update() {
    // Overlap with player
    this.game.physics.arcade.overlap(
      this.player,
      this.sprite,
      this.onOverlap,
      null,
      this
    );
  }

  onOverlap(player, sprite) {
    // When overlapped, add this item to their inventory
    if (!this.collectible) return;
    this.collectible = false;
    store.inventory.push(this.name);
    this.placePortrait();

    // Call a callback if one exists
    if (this.afterPickup)
      this.afterPickup();
  }

  placePortrait() {
    this.sprite.reset(
      16 + 32 * (store.inventory.length - 1),
      this.game.height - 56
    );
    this.sprite.fixedToCamera = true;
  }
}
