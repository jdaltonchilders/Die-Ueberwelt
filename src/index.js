/*jshint esversion: 6 */

// General Game States
import Boot from './states/boot';
import Preload from './states/preload';

// Hero Island States
import HeroIsland from './states/hero-island';
import HeroHome from './states/hero-home';

// Boss Fight State
import BossFight from './states/boss-fight';

class Game extends Phaser.Game {
  constructor() {
    super(800, 500, Phaser.AUTO, 'gameArea');

    // Add to the State Manager (key, state, autoStart)
    this.state.add('Boot', Boot, false);
    this.state.add('Preload', Preload, false);

    // Hero States
    this.state.add('HeroHome', HeroHome, false);
    this.state.add('HeroIsland', HeroIsland, false);

    // Boss States
    this.state.add('BossFight', BossFight, false);

    // Start state (state, clearWorld (boolean), clearCache(boolean))
    this.state.start('Boot');
  }
}

new Game();
