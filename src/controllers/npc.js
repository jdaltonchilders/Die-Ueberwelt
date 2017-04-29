/*jshint esversion: 6 */

export default class NPC {
  constructor(game, key, x, y, strategy) {
    this.game = game;
    this.strategy = strategy;

    // "sideways", "circle"
    const spawnX = x || 0;
    const spawnY = y || 0;

    // Create the player sprite
    this.sprite = this.game.add.sprite(spawnX, spawnY, key);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.smoothed = false;

    // Customize Physics
    this.game.physics.arcade.enable(this.sprite, true);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setSize(18, 12, 4, 28);

    // TODO: How does this fit in with multiple keys?
    // Create animations
    this.sprite.animations.add("up", [ 36, 37, 38, 37 ], 5, true);
    this.sprite.animations.add("right", [ 24, 25, 26, 25 ], 5, true);
    this.sprite.animations.add("left", [ 12, 13, 14, 13 ], 5, true);
    this.sprite.animations.add("down", [ 0, 1, 2, 1 ], 5, true);

    // Configure movement
    this.movementDelay = 1000;
    this.nextMove = this.game.time.now + this.movementDelay;

    this.pointIndex = 0;
    if (strategy === "sideways") {
      this.points = [
        { x: spawnX, y: spawnY },
        { x: spawnX - 64, y: spawnY },
        { x: spawnX, y: spawnY },
        { x: spawnX + 64, y: spawnY }
      ];
    } else if (strategy === "circle") {
      this.points = [
        { x: spawnX, y: spawnY },
        { x: spawnX, y: spawnY + 64 },
        { x: spawnX + 64, y: spawnY + 64 },
        { x: spawnX + 64, y: spawnY }
      ];
    } else {
      // Stand still
      this.points = [ { x: spawnX, y: spawnY } ];
    }
  }

  update() {
    // Determine if we are past this.nextMove
    if (this.game.time.now < this.nextMove) return;

    // Delay next movement first
    this.nextMove = this.nextMove + this.movementDelay;

    // Determine next point
    const possiblePointIndex = this.pointIndex += 1;
    this.pointIndex = possiblePointIndex < this.points.length
      ? possiblePointIndex
      : 0;
    const nextPoint = this.points[this.pointIndex];

    // Determine angle to point and choose animation to play
    let angle = this.game.math.angleBetween(this.sprite.x, this.sprite.y, nextPoint.x, nextPoint.y);
    if (angle < 0) angle += this.game.math.degToRad(360);

    // Determine the direction to target
    const topRight = this.game.math.degToRad(315);
    const topLeft = this.game.math.degToRad(225);
    const bottomLeft = this.game.math.degToRad(135);
    const bottomRight = this.game.math.degToRad(45);
    var direction = 'right';
    if (angle > bottomRight && angle < bottomLeft) direction = 'down';
    else if (angle > bottomLeft && angle < topLeft) direction = 'left';
    else if (angle > topLeft && angle < topRight) direction = 'up';

    // Play the animation
    this.sprite.animations.play(direction, null, true);

    // Move to next point
    this.game.physics.arcade.moveToXY(
      this.sprite,
      nextPoint.x,
      nextPoint.y,
      null,
      this.movementDelay
    );
  }
}
