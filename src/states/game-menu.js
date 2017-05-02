/*jshint esversion: 6 */

import AudioManager from "../utilities/audio-manager";

class GameMenu extends Phaser.State {
  preload() {
    // Load Images
    this.game.load.image("island", "assets/images/titleIsland.png");
    this.game.load.image("cloud", "assets/images/cloud.png");
    this.game.load.image("mainImage", "assets/images/gameMenuImage.png");
  }

  create() {
    // Play Audio
    this.audioManager = new AudioManager(this.game);
    this.audioManager.play("introBackground", true, 0, 0.4, false);

    // Create Image
    this.mainImage = this.game.add.image(0, 0, "mainImage");

    // Resize Image (Needs Work)
    this.mainImage.height = window.innerHeight;
    this.mainImage.width = window.innerWidth;
    this.mainImage.smoothed = false;

    // Create keys
    this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.hKey = this.game.input.keyboard.addKey(Phaser.Keyboard.H);

    // Initiate the modal class
    this.reg = {};
    this.reg.modal = new gameModal(this.game);
    this.createModals();

    /**
    // Set Background color
    this.game.stage.backgroundColor = "#55b4ff";

    // Create Floating Island
    this.floatingIsland = this.game.add.sprite(150, 300, "island");

    // Scale Island
    this.floatingIsland.scale.setTo(0.8, 0.8);

    // Create Clouds
    this.cloudOne = this.game.add.sprite(80, 200, "cloud");
    this.cloudTwo = this.game.add.sprite(1000, 50, "cloud");
    this.cloudThree = this.game.add.sprite(1500, 350, "cloud");
    this.cloudFour = this.game.add.sprite(120, 1050, "cloud");
    this.cloudFive = this.game.add.sprite(475, 975, "cloud");
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
    this.titleText = this.game.add.text(500, -100, "Die Überwelt", this.title);
    this.titleText.setShadow(3, 3, "rgba(0,0,0,0.5)", 2);

    //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
    this.titleText.setTextBounds(0, 0, window.innerWidth, window.innerHeight);

    // Sub Title Text
    this.subTitle = {
      font: "80px fantasy",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "middle"
    };

    //  The Sub Title Text is positioned at 0, 100
    this.subTitleText = this.game.add.text(525, 0, "A Tale of Nobody...", this.subTitle);
    this.subTitleText.setShadow(3, 3, "rgba(0,0,0,0.5)", 2);

    //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
    this.subTitleText.setTextBounds(0, 0, window.innerWidth, window.innerHeight);

    // Start Game Text
    this.startGameTitle = {
      font: "50px fantasy",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "middle"
    };

    //  The Start Game Text is positioned at 0, 100
    this.startGameText = this.game.add.text(525, 500, "Press [Enter] to Start the Tale", this.startGameTitle);
    this.startGameText.setShadow(3, 3, "rgba(0,0,0,0.5)", 2);

    //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
    this.startGameText.setTextBounds(0, 0, window.innerWidth, window.innerHeight);

    // How to Play Text
    this.how2PlayTitle = {
      font: "50px fantasy",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "middle"
    };

    //  The Start Game Text is positioned at 0, 100
    this.how2PlayText = this.game.add.text(525, 575, "Press [H] for 'How to Play'", this.how2PlayTitle);
    this.how2PlayText.setShadow(3, 3, "rgba(0,0,0,0.5)", 2);

    //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
    this.how2PlayText.setTextBounds(0, 0, window.innerWidth, window.innerHeight);

    */
  }

  update() {
    // If Enter Pressed Start Game
    if (this.enter.isDown) {
      this.game.state.start('Preload');
    }

    // If H Key Pressed Show Modal
    if (this.hKey.isDown) {
      this.showHTPModal();
    }

  }

  createModals() {
    // How to Play Modal
    this.reg.modal.createModal({
      type: 'htp1',
      includeBackground: true,
      modalCloseOnInput: true,
      backgroundOpacity: 0.9,
      itemsArr: [
        {
          type: 'text',
          align: 'center',
          content: `
  How to Play\n
  Welcome to Unendlicher Turm!\n
  Basic Actions
  Use the W, A, S, D (or arrow) keys to move your player around the map.
  Press the F key to toggle Fullscreen.\n
  Arena Actions
  Use the space bar or left-click the mouse to fire.\nUsing the mouse will increase your accuracy.\n
  Shop Actions
  Purchase health, damage, or speed by standing on it's respective rune and pressing the Enter key.
  The fountain on the left will restore health, while the runes are used to purchase
  health (green), damage (red) and speed (blue).`,
          fontFamily: 'fantasy',
          fontSize: 18,
          color: '0xFFFFFF',
          offsetY: -25
        }
      ]
    });
  }

  showHTPModal() {
    this.reg.modal.showModal('htp1');
  }

}

export default GameMenu;
