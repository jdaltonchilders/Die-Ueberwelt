/*jshint esversion: 6 */

import store from "../store";
import Dialogue from "../utilities/dialogue";
import DialogueManager from "../utilities/dialogueManager";

var text;
var dialogueManager;
var dialogue;

class Preload extends Phaser.State {
  preload() {
    // Load Player
    this.game.load.spritesheet("player", "assets/images/chara2.png", 26, 37);
    this.game.load.image("bullet", "assets/images/bullet.png");

    // Load NPCs
    this.game.load.spritesheet("npc", "assets/images/npc3.png", 26, 37);

    // Load items
    this.game.load.image("Pickaxe", "assets/images/pickaxe.png");
    this.game.load.image("Staff", "assets/images/staff.png");
    this.game.load.image("Shoes", "assets/images/shoes.png");
    this.game.load.image("Robe", "assets/images/robe.png");
    this.game.load.image("boulder", "assets/images/boulder.png");

    // Load monsters
    this.game.load.spritesheet(
      "wolf",
      "assets/images/monster_wolf1.png",
      64,
      66
    );
    this.game.load.spritesheet(
      "treant",
      "assets/images/monster_golem2.png",
      47,
      50
    );

    // Load boss
    this.game.load.spritesheet("boss", "assets/images/elemental.png", 120, 129);
    this.game.load.spritesheet(
      "boss1bullet",
      "assets/images/waterbullet.png",
      40,
      56
    );
    this.game.load.spritesheet(
      "boss2bullet",
      "assets/images/firebullet.png",
      40,
      56
    );
  }

  create() {
    // Fix up state info in Store
    store.previousState = "Preload";
    store.currentState = store.nextState = "HeroHome";

    // Start Next Game State
    // this.game.state.start('Test');

    // For testing: REMEMBER REMOVE FOR MAIN GAME
    this.game.state.start("HeroHome");

    // Create text element
    text = this.game.add.text(
      this.game.world.centerX,
      this.game.world.centerY,
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

    // Create dialogue manager
    dialogueManager = new DialogueManager(this.game, text);

    // Create dialogue
    dialogue = new Dialogue([
      "Team Spike Presents",
      "Die Überwelt",
      "...",
      "Your whole life you've been a nobody...",
      "And today is no different.",
      "But today, a nobody and everybody else was rudely awoken...",
      "By what could only be the crumbling of the world.",
      "Now, go forth and save the world from crumbling like last night's PopTart dinner!",
      ""
    ]);

    // Load dialogue
    dialogueManager.load(dialogue);

    // Lol I forgot how incomplete i left this library
    // Wire up the timers for dialogue to actuallly... happen C:
    // Then, go to hero home when it ends
    setInterval(() => dialogueManager.updateLine(), 50);
    setInterval(() => dialogueManager.next(), 6000);
    setTimeout(() => this.game.state.start("HeroHome"), 48000);
  }

  shutdown() {
    this.game.sound.stopAll();
  }
}

export default Preload;
