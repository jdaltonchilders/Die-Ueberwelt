/*jshint esversion: 6 */

// General Game States
import Boot from './states/boot';
import Preload from './states/preload';

// Hero Island States
import HeroIsland from './states/hero-island';
import HeroHome from './states/hero-home';

class Game extends Phaser.Game {
  constructor() {
    super('100%', '100%', Phaser.AUTO, 'gameArea');

    // Add to the State Manager (key, state, autoStart)
    this.state.add('Boot', Boot, false);
    this.state.add('Preload', Preload, false);
    this.state.add('HeroHome', HeroHome, false);
    this.state.add('HeroIsland', HeroIsland, false);

    // Start state (state, clearWorld (boolean), clearCache(boolean))
    this.state.start('Boot');
  }
}

new Game();
