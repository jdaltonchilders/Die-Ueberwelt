/*jshint esversion: 6 */

import AudioManager from "../utilities/audio-manager";
import store from "../store";

class DeathScreen extends Phaser.State {
  preload() {
    // Load Cloud Image
    this.game.load.image("cloud", "assets/images/cloud.png");
    this.game.load.image("deathImage", "assets/images/deathScreen.png");
  }

  create() {
    // Set Background color
    this.game.stage.backgroundColor = "#55b4ff";

    // Audio
    this.audioManager = new AudioManager(this.game);
    this.audioManager.play("deathBackground", true, 0, 0.2, false);

    // Create Image
    this.deathImage = this.game.add.image(0, 0, "deathImage");

    // Resize Image (Needs Work)
    this.deathImage.height = window.innerHeight;
    this.deathImage.width = window.innerWidth;
    this.deathImage.smoothed = false;

    /**
    // Set Background color
    this.game.stage.backgroundColor = "#55b4ff";

    // Create Clouds
    this.cloudOne = this.game.add.sprite(80, 10, "cloud");
    this.cloudTwo = this.game.add.sprite(1100, 60, "cloud");
    this.cloudFour = this.game.add.sprite(400, 100, "cloud");
    this.cloudSeven = this.game.add.sprite(350, 480, "cloud");

    this.cloudThree = this.game.add.sprite(1500, 350, "cloud");
    this.cloudFour = this.game.add.sprite(120, 1050, "cloud");
    this.cloudFive = this.game.add.sprite(475, 900, "cloud");
    this.cloudSix = this.game.add.sprite(875, 300, "cloud");
    this.cloudSeven = this.game.add.sprite(1100, 800, "cloud");
    this.cloudEight = this.game.add.sprite(1600, 950, "cloud");
    this.cloudNine = this.game.add.sprite(2000, 135, "cloud");
    this.cloudTen = this.game.add.sprite(2300, 500, "cloud");
    this.cloudEleven = this.game.add.sprite(2100, 875, "cloud");

    // Title Text
    this.title = {
      font: "100px fantasy",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "middle"
    };

    //  The Title Text is positioned at 0, 100
    this.titleText = this.game.add.text(0, 0, "You've Failed!", this.title);
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
      "We're recovering your worthless soul.",
      this.info
    );
    this.infoText.setShadow(3, 3, "rgba(0,0,0,0.5)", 2);

    //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
    this.infoText.setTextBounds(0, 100, window.innerWidth, window.innerHeight);

    // Fix up state info in Store
    store.previousState = "DeathScreen";
    store.currentState = store.nextState = "HeroIsland";
*/
    // Remove One Item from the Player inventory
    if (store.inventory.length > 0) {
      // Select random item based on the length of the array
      this.removeInventory =
        Math.floor(Math.random() * (store.inventory.length - 0 + 1)) + 0;
      // Remove selected item from array
      store.inventory.splice(this.removeInventory, 1);
    }

    // Reset Player Health
    store.health = store.maxHealth;
    // Start Next Game State
    setTimeout(() => {
      // Update State Information
      store.previousState = "DeathScreen";
      store.currentState = store.nextState = "HeroIsland";

      // Load the Hero Home State
      this.game.state.start("HeroIsland");
    }, 10000);
  }

  shutdown() {
    this.game.sound.stopAll();
  }
}

export default DeathScreen;
