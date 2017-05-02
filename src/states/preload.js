/*jshint esversion: 6 */

import store from "../store";
import Dialogue from "../utilities/dialogue";
import DialogueManager from "../utilities/dialogueManager";
import AudioManager from "../utilities/audio-manager";

var text;
var dialogueManager;
var dialogue;

class Preload extends Phaser.State {
  preload() {}

  create() {
    // Play Audio
    this.audioManager = new AudioManager(this.game);
    if (store.previousState !== "GameMenu") {
      this.audioManager.play("introBackground", true, 0, 0.4, false);
    }

    // Create keys
    this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    // Fix up state info in Store
    store.previousState = "Preload";
    store.currentState = store.nextState = "HeroHome";

    // For testing: REMEMBER REMOVE FOR MAIN GAME
    // this.game.state.start("BossFight");
    // return;
    // :)

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
