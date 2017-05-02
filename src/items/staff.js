import Item from "../gui/item";
import AudioManager from "../utilities/audio-manager";
import Dialogue from "../utilities/dialogue";
import store from "../store";

export default (game, x, y, player) => {
  var item = new Item(
    game,
    x,
    y,
    "Staff",
    "Staff",
    player,
    new Dialogue([
      "You found the Staff of [Instructor: Staff]!",
      "You sense your magic will be more effective.",
      ""
    ])
  );

  item.sprite.scale.set(0.75, 0.75);
  // item.sprite.smoothed = false;
  item.afterPickup = () => {
    // Call item pickup sound
    var audioManager = new AudioManager(game);
    audioManager.play("item_pickup", false, 0, 1);
    // Powerups
    store.damage *= 2;
  };
  return item;
};
