/*jshint esversion: 6 */

import AudioManager from "../utilities/audio-manager";
import store from "../store";

class VictoryScreen extends Phaser.State {
  preload() {
    // Load Cloud Image
    this.game.load.image("cloud", "assets/images/cloud.png");
    this.game.load.image("island", "assets/images/titleIsland.png");
    this.game.load.image("victoryImage", "assets/images/victoryScreen.png");
  }

  create() {
    // Set Background color
    this.game.stage.backgroundColor = "#55b4ff";
    
    // Audio
    this.audioManager = new AudioManager(this.game);
    this.audioManager.play("victoryBackground", true, 0, 0.2, false);

    // Create Image
    this.victoryImage = this.game.add.image(0, 0, "victoryImage");

    // Resize Image (Needs Work)
    this.victoryImage.height = window.innerHeight;
    this.victoryImage.width = window.innerWidth;
    this.victoryImage.smoothed = false;

    /**
    // Set Background color
    this.game.stage.backgroundColor = "#55b4ff";

    // Create Floating Island
    this.floatingIsland = this.game.add.sprite(1400, 1000, "island");

    // Scale Island
    this.floatingIsland.scale.setTo(0.8, 0.8);

    // Create Clouds
    this.cloudOne = this.game.add.sprite(80, 10, "cloud");
    this.cloudTwo = this.game.add.sprite(1100, 60, "cloud");
    this.cloudFour = this.game.add.sprite(2850, 1400, "cloud");
    this.cloudSeven = this.game.add.sprite(350, 480, "cloud");

    this.cloudThree = this.game.add.sprite(1500, 350, "cloud");
    this.cloudFour = this.game.add.sprite(120, 1050, "cloud");
    this.cloudFive = this.game.add.sprite(475, 900, "cloud");
    this.cloudSix = this.game.add.sprite(600, 1400, "cloud");
    this.cloudSeven = this.game.add.sprite(1100, 1100, "cloud");
    this.cloudEight = this.game.add.sprite(2500, 950, "cloud");
    this.cloudNine = this.game.add.sprite(2000, 135, "cloud");
    this.cloudTen = this.game.add.sprite(2800, 300, "cloud");
    this.cloudEleven = this.game.add.sprite(2175, 1200, "cloud");

    // Title Text
    this.title = {
      font: "100px fantasy",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "middle"
    };

    //  The Title Text is positioned at 0, 100
    this.titleText = this.game.add.text(0, -100, "You've Saved the Islands!", this.title);
    this.titleText.setShadow(3, 3, "rgba(0,0,0,0.5)", 2);

    //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
    this.titleText.setTextBounds(0, 0, window.innerWidth, window.innerHeight);

    // Information Text
    this.info = {
      font: "30px fantasy",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "middle"
    };
    //  The Information Text is positioned at 0, 100
    this.infoText = this.game.add.text(
      0,
      0,
      "Unfortunately we rarely remember our Heroes, but good game all the same.",
      this.info
    );
    this.infoText.setShadow(3, 3, "rgba(0,0,0,0.5)", 2);

    //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
    this.infoText.setTextBounds(0, 0, window.innerWidth, window.innerHeight);

    // Fix up state info in Store
    store.previousState = store.currentState;
    store.currentState = store.nextState = "HeroIsland";

    // Remove One Item from the Player inventory
    if (store.inventory.length > 0) {
      // Select random item based on the length of the array
      this.removeInventory =
        Math.floor(Math.random() * (store.inventory.length - 0 + 1)) + 0;
      // Remove selected item from array
      store.inventory.splice(this.removeInventory, 1);
    }

    */

    // Reset Player Health
    store.health = store.maxHealth;

    // Start Next Game State
    setTimeout(() => {
      // Update State Information
      store.previousState = "VictoryScreen";
      store.currentState = store.nextState = "GameMenu";

      // Load the Hero Home State
      this.game.state.start("GameMenu");
    }, 42000);
  }

  shutdown() {
    this.game.sound.stopAll();
  }
}

export default VictoryScreen;
