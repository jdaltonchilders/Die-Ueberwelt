import Item from '../gui/item';
import Dialogue from '../utilities/dialogue';

export default (game, x, y, player) => {
  var item = new Item(
    game,
    x,
    y,
    'Pickaxe',
    'Pickaxe',
    player,
    new Dialogue([
      'You found a pickaxe!',
      'Press [SPACE] to break rocks with it.',
      ''
    ])
  );
  item.sprite.scale.set(0.75, 0.75);
  // item.sprite.smoothed = false;
  return item;
};
