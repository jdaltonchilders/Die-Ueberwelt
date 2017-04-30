/*jshint esversion: 6 */

export default class AudioManager {
  constructor(game) {
    /* Could we maybe load in here? */
    this.game = game;
    this.mainBackground = this.game.add.audio('mainBackground');
    this.arenaBackground = this.game.add.audio('arenaBackground');
  }

  preload() {
    this.game.load.audio('mainBackground', 'assets/audio/landscape/middle_earth_dawn.ogg');
    this.game.load.audio('arenaBackground', 'assets/audio/landscape/madGod.ogg');
  }

  play(key, loop) {
    try {
      this[key].play(null, null, null, loop);
    } catch (err) {
      console.error(err);
    }
  }
}
