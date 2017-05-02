/*jshint esversion: 6 */

// General Game States
import Boot from "./states/boot";
import Preload from "./states/preload";

// Hero Island States
import HeroIsland from "./states/hero-island";
import HeroHome from "./states/hero-home";

// Extra Home States
import BlackHome from "./states/black-home";
import GreenHome from "./states/green-home";
import GreyHome from "./states/grey-home";
import GreyCabin from "./states/grey-cabin";
import RedCabin from "./states/red-cabin";
import TealCabin from "./states/teal-cabin";

// Ancient Forest States
import AncientForest from "./states/ancient-forest";
import DungeonLevelOne from "./states/dungeon-level-one";

// Boss Fight State
import BossFight from "./states/boss-fight";

// Death State
import DeathScreen from "./states/death-screen";

// Rad test state, yo
import Test from "./states/test";

class Game extends Phaser.Game {
  constructor() {
    super(window.innerWidth, window.innerHeight, Phaser.AUTO, "gameArea");

    // Add to the State Manager (key, state, autoStart)
    this.state.add("Boot", Boot, false);
    this.state.add("Preload", Preload, false);

    // Hero States
    this.state.add("HeroHome", HeroHome, false);
    this.state.add("HeroIsland", HeroIsland, false);

    // Extra Home States
    this.state.add("BlackHome", BlackHome, false);
    this.state.add("GreenHome", GreenHome, false);
    this.state.add("GreyHome", GreyHome, false);
    this.state.add("GreyCabin", GreyCabin, false);
    this.state.add("RedCabin", RedCabin, false);
    this.state.add("TealCabin", TealCabin, false);

    // Ancient Forest States
    this.state.add("AncientForest", AncientForest, false);
    this.state.add("DungeonLevelOne", DungeonLevelOne, false);

    // Boss States
    this.state.add("BossFight", BossFight, false);

    // Death State
    this.state.add("DeathScreen", DeathScreen, false);

    // Ya got a kickin' test state, dawg
    this.state.add("Test", Test, false);

    // Start state (state, clearWorld (boolean), clearCache(boolean))
    this.state.start("Boot");
  }
}

new Game();
