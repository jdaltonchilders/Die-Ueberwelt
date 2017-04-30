import Item from '../gui/item';
import store from '../store';

export default (game, x, y, player) => {
  var item = new Item(game, x, y, 'Robe', 'Robe', player);
  item.sprite.scale.set(0.75, 0.75);
  // item.sprite.smoothed = false;
  item.afterPickup = () => {
    store.health *= 2;
    store.maxHealth *= 2;
  };
  return item;
};
