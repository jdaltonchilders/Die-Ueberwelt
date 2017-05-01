import Item from '../gui/item';
import store from '../store';
import AudioManager from '../utilities/audio-manager';

export default (game, x, y, player) => {
    var item = new Item(game, x, y, 'Robe', 'Robe', player);
    item.sprite.scale.set(0.75, 0.75);
    // item.sprite.smoothed = false;
    item.afterPickup = () => {
        // Call item pickup sound 
        var audioManager = new AudioManager(game);
        audioManager.play('item_pickup', false, 0, 1);
        // Powerups
        store.health *= 2;
        store.maxHealth *= 2;
    };
    return item;
};