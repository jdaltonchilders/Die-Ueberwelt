import Item from '../gui/item';
import Dialogue from '../utilities/dialogue';
import store from '../store';

export default (game, x, y, player) => {
  var item = new Item(
    game,
    x,
    y,
    'Shoes',
    'Shoes',
    player,
    new Dialogue([
      'You got a new pair of shoes!',
      "Usain Bolt ain't got nothing on you.",
      ''
    ])
  );
  item.sprite.scale.set(0.75, 0.75);
  // item.sprite.smoothed = false;
  item.afterPickup = () => {
    store.speed += 50;
  };
  return item;
};
