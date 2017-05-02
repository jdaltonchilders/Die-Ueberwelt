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
  game.physics.arcade.enable(item.sprite, true);
  item.sprite.body.setSize(64, 64, -16, -16);
  // item.sprite.smoothed = false;
  item.afterPickup = playerController => {
    // Call item pickup sound
    var audioManager = new AudioManager(game);
    audioManager.play("item_pickup", false, 0, 1);

    // Heal the player
    const healing = store.inventory.indexOf("Robe") === -1 ? 15 : 30;
    playerController.controller.heal(healing);
    console.log(playerController, healing);

    // Prevent eating from this house again
    if (houseKey) store.eatenFromHouses.push(houseKey);
  };
  return item;
};
