import Item from "../gui/item";
import AudioManager from "../utilities/audio-manager";
import Dialogue from "../utilities/dialogue";
import store from "../store";

export default (game, x, y, player, houseKey) => {
  var item = new Item(
    game,
    x,
    y,
    "Food",
    "Food",
    player,
    new Dialogue([
      "You ate some delicious food!",
      "You feel a little healthier.",
      ""
    ]),
    false
  );
  item.sprite.scale.set(0.75, 0.75);
  // item.sprite.smoothed = false;
  item.afterPickup = () => {
    // Call item pickup sound
    var audioManager = new AudioManager(game);
    audioManager.play("item_pickup", false, 0, 1);

    // Heal the player
    store.health += store.inventory.indexOf("Robe") === -1 ? 20 : 40;
    if (store.health > store.maxHealth) store.health = store.maxHealth;

    // Prevent eating from this house again
    if (houseKey) store.eatenFromHouses.push(houseKey);
  };
  return item;
};
