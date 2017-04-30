/*jshint esversion: 6 */

import store from '../store';

class DeathScreen extends Phaser.State {


    preload() {

    }

    create() {
        // Set Background color
        this.game.stage.backgroundColor = '#55b4ff'

        // Title Text
        this.title = { font: "100px fantasy", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        //  The Title Text is positioned at 0, 100
        this.titleText = this.game.add.text(0, 0, "You've Failed!", this.title);
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
        this.titleText.setTextBounds(0, 0, window.innerWidth, window.innerHeight);

        // Information Text
        this.info = { font: "30px fantasy", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        //  The Information Text is positioned at 0, 100
        this.infoText = this.game.add.text(0, 0, "We're recovering your worthless soul.", this.info);
        this.infoText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
        this.infoText.setTextBounds(0, 100, window.innerWidth, window.innerHeight);

        // Fix up state info in Store
        store.previousState = 'DeathScreen';
        store.currentState = store.nextState = 'HeroIsland';
        // Start Next Game State
        setTimeout(() => {
            this.game.state.start('HeroIsland');
        }, 4000);
    }
}

export default DeathScreen;