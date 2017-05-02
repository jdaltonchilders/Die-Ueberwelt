/*jshint esversion: 6 */

export default class AudioManager {
  constructor(game) {
    /* Could we maybe load in here? */
    this.game = game;

    // Landscape Audio
    this.introBackground = this.game.add.audio("introBackground");
    this.mainBackground = this.game.add.audio("mainBackground");
    this.forestBackground = this.game.add.audio("forestBackground");
    this.dungeonBackground = this.game.add.audio("dungeonBackground");
    this.arenaBackground = this.game.add.audio("arenaBackground");
    this.victoryBackground = this.game.add.audio("victoryBackground");
    this.deathBackground = this.game.add.audio("deathBackground");

    // Save background / landscape music
    this.backgrounds = [
      this.introBackground,
      this.mainBackground,
      this.forestBackground,
      this.dungeonBackground,
      this.arenaBackground,
      this.victoryBackground,
      this.deathBackground
    ];

    // Player Audio
    this.player_ugh = this.game.add.audio("player_ugh");
    this.firestrike = this.game.add.audio("firestrike");
    this.strikeEnemy = this.game.add.audio("strikeEnemy");

    // Enemy Audio
    this.wolf_notice = this.game.add.audio("wolf_notice");
    this.treant_notice = this.game.add.audio("treant_notice");
    this.ghost_notice = this.game.add.audio("ghost_notice");
    this.wolf_death = this.game.add.audio("wolf_death");
    this.treant_death = this.game.add.audio("treant_death");
    this.ghost_death = this.game.add.audio("ghost_death");

    // Boss Audio
    this.boss_firestrike = this.game.add.audio("boss_firestrike");
    this.boss_waterstrike = this.game.add.audio("boss_waterstrike");
    this.boss_death = this.game.add.audio("boss_death");

    // Misc Audio
    this.item_pickup = this.game.add.audio("item_pickup");
    this.door_open = this.game.add.audio("door_open");
  }

  preload() {
    // Landscape Audio
    this.game.load.audio(
      "introBackground",
      "assets/audio/landscape/city_ruins_shade.ogg"
    );
    this.game.load.audio(
      "mainBackground",
      "assets/audio/landscape/world_1.ogg"
    );
    this.game.load.audio(
      "forestBackground",
      "assets/audio/landscape/memories_of_dust.ogg"
    );
    this.game.load.audio(
      "dungeonBackground",
      "assets/audio/landscape/wretched_weaponry.ogg"
    );
    this.game.load.audio(
      "arenaBackground",
      "assets/audio/landscape/a_beautiful_song.ogg"
    );
    this.game.load.audio(
      "victoryBackground",
      "assets/audio/landscape/world_2.ogg"
    );
    this.game.load.audio(
      "deathBackground",
      "assets/audio/landscape/the_sound_of_the_end.ogg"
    );

    // Player Audio
    this.game.load.audio("player_ugh", "assets/audio/damage/player_ugh.ogg");
    this.game.load.audio("firestrike", "assets/audio/attack/firestrike.ogg");
    this.game.load.audio("strikeEnemy", "assets/audio/attack/strikeEnemy.ogg");

    // Enemy Audio
    this.game.load.audio("wolf_notice", "assets/audio/action/wolf_notice.ogg");
    this.game.load.audio("treant_notice", "assets/audio/action/treant_notice.ogg");
    this.game.load.audio("ghost_notice", "assets/audio/action/ghost_notice.ogg");
    this.game.load.audio("wolf_death", "assets/audio/damage/wolf_death.ogg");
    this.game.load.audio("treant_death", "assets/audio/damage/treant_death.ogg");
    this.game.load.audio("ghost_death", "assets/audio/damage/ghost_death.ogg");

    // Boss Audio
    this.game.load.audio("boss_firestrike", "assets/audio/action/boss_firestrike.ogg");
    this.game.load.audio("boss_waterstrike", "assets/audio/action/boss_waterstrike.ogg");
    this.game.load.audio("boss_death", "assets/audio/damage/boss_death.ogg");

    // Misc Audio
    this.game.load.audio("item_pickup", "assets/audio/action/item_pickup.ogg");
    this.game.load.audio("door_open", "assets/audio/action/door_open.ogg");
  }

  /**
   *
   * @param {string} key
   * @param {boolean} loop
   * @param {number} start
   * @param {number} volume
   * @param {boolen} noDelay Ignore isPlaying status
   */
  play(key, loop, start, volume, noDelay) {
    if (this.backgrounds.indexOf(key) !== -1) {
      const otherTracks = this.backgrounds.filter(item => item !== key);
      otherTracks.map(item => this[item].stop());
    }

    try {
      console.log(`Playing ${key}`);
      const audio = this[key];
      if (noDelay || !audio.isPlaying) audio.play(null, start, volume, loop);
    } catch (err) {
      console.error(err);
    }
  }
}
