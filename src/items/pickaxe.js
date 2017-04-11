import Item from './item';

export default (game, x, y, player) => {
  var item = new Item(game, x, y, 'Pickaxe', 'Pickaxe', player);
  item.sprite.scale.set(0.75, 0.75);
  // item.sprite.smoothed = false;
  return item;
};
