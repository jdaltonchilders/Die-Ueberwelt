/*jshint esversion: 6 */

import DialogueManager from "../utilities/dialogueManager";

import store from "../store";

export default class Item {
  constructor(game, x, y, name, spriteKey, player, dialogue) {
    this.game = game;
    this.name = name;
    this.player = player;
    this.dialogue = dialogue;

    const spawnX = x || 0;
    const spawnY = y || 0;

    this.sprite = this.game.add.sprite(spawnX, spawnY, spriteKey);
    this.sprite.anchor.set(0.5, 0.5);
    this.game.physics.arcade.enable(this.sprite);

    this.collectible = true;
  }

  preload() {
    // Load Audio
    this.game.load.audio("item_pickup", "assets/audio/action/item_pickup.ogg");
  }

  create() {
    // Create Audio for item pickup
    this.itemPickup = this.game.add.audio("item_pickup");
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

    // Call callback if one exists
    if (this.afterPickup) this.afterPickup();

    // Skip dialogue logic if we don't have anything to say
    if (!this.dialogue) return;

    var text = this.game.add.text(
      window.innerWidth / 2,
      window.innerHeight / 2,
      "",
      {
        font: "60px fantasy",
        fill: "#ecf0f1",
        align: "center",
        wordWrap: true,
        wordWrapWidth: window.innerWidth - 100
      }
    );
    text.anchor.setTo(0.5);

    var dialogueManager = new DialogueManager(this.game, text);
    dialogueManager.load(this.dialogue);

    var playing = true;
    setInterval(() => {
      if (playing) dialogueManager.updateLine();
    }, 50);
    setInterval(() => {
      // Ugh I wish this library was finished
      if (playing) dialogueManager.next();
    }, 6000);
    setTimeout(() => {
      playing = false;
    }, 6000 * this.dialogue.texts.length);
  }

  placePortrait() {
    this.sprite.reset(
      16 + 32 * (store.inventory.length - 1),
      this.game.height - 56
    );
    this.sprite.fixedToCamera = true;
  }
}
