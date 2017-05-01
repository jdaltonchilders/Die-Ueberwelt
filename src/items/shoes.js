import Item from "../gui/item";
import AudioManager from "../utilities/audio-manager";
import Dialogue from "../utilities/dialogue";
import store from "../store";

export default (game, x, y, player) => {
  var item = new Item(
    game,
    x,
    y,
    "Shoes",
    "Shoes",
    player,
    new Dialogue([
      "You got a new pair of shoes!",
      "Usain Bolt ain't got nothing on you.",
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
    store.speed += 50;
  };
  return item;
};
