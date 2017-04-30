/*jshint esversion: 6 */

import store from '../store';

class DeathScreen extends Phaser.State {


    preload() {

    }

    create() {
        // Set Background color
        this.game.stage.backgroundColor = '#55b4ff'

        this.style = { font: "100px fantasy", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        //  The Text is positioned at 0, 100
        this.text = this.game.add.text(0, 0, "You've Failed!", this.style);
        this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
        this.text.setTextBounds(0, 0, window.innerWidth, window.innerHeight);

        // Fix up state info in Store
        store.previousState = 'DeathScreen';
        store.currentState = store.nextState = 'HeroIsland';
        // Start Next Game State
        // this.game.state.start('HeroHome');
    }
}

export default DeathScreen;