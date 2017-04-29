/*jshint esversion: 6 */

export default class NPC {
  constructor(game, name, x, y, strategy) {
    this.game = game;
    this.strategy = strategy;

    // "sideways", "circle"
    const spawnX = x || 0;
    const spawnY = y || 0;

    // Create the player sprite
    this.sprite = this.game.add.sprite(spawnX, spawnY, "npc");
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.smoothed = false;

    // Customize Physics
    this.game.physics.arcade.enable(this.sprite, true);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setSize(18, 12, 4, 28);

    // Create animations
    if (name === "Old Guy") {
      this.sprite.animations.add("up", [ 36, 37, 38, 37 ], 5, true);
      this.sprite.animations.add("right", [ 24, 25, 26, 25 ], 5, true);
      this.sprite.animations.add("left", [ 12, 13, 14, 13 ], 5, true);
      this.sprite.animations.add("down", [ 0, 1, 2, 1 ], 5, true);
      this.sprite.frame = 1;
    } else if (name === "Merchant") {
      this.sprite.animations.add("up", [ 39, 40, 41, 40 ], 5, true);
      this.sprite.animations.add("right", [ 27, 28, 29, 28 ], 5, true);
      this.sprite.animations.add("left", [ 15, 16, 17, 16 ], 5, true);
      this.sprite.animations.add("down", [ 3, 4, 5, 4 ], 5, true);
      this.sprite.frame = 4;
    } else if (name === "Rookie") {
      this.sprite.animations.add("up", [ 42, 43, 44, 43 ], 5, true);
      this.sprite.animations.add("right", [ 30, 31, 32, 31 ], 5, true);
      this.sprite.animations.add("left", [ 18, 19, 20, 19 ], 5, true);
      this.sprite.animations.add("down", [ 6, 7, 8, 7 ], 5, true);
      this.sprite.frame = 7;
    } else if (name === "Beard") {
      this.sprite.animations.add("up", [ 45, 46, 47, 46 ], 5, true);
      this.sprite.animations.add("right", [ 33, 34, 35, 34 ], 5, true);
      this.sprite.animations.add("left", [ 21, 22, 23, 22 ], 5, true);
      this.sprite.animations.add("down", [ 9, 10, 11, 10 ], 5, true);
      this.sprite.frame = 10;
    } else if (name === "Green") {
      this.sprite.animations.add("up", [ 84, 85, 86, 85 ], 5, true);
      this.sprite.animations.add("right", [ 72, 73, 74, 73 ], 5, true);
      this.sprite.animations.add("left", [ 60, 61, 62, 61 ], 5, true);
      this.sprite.animations.add("down", [ 48, 49, 50, 49 ], 5, true);
      this.sprite.frame = 49;
    } else if (name === "Red") {
      this.sprite.animations.add("up", [ 87, 88, 89, 88 ], 5, true);
      this.sprite.animations.add("right", [ 75, 76, 77, 76 ], 5, true);
      this.sprite.animations.add("left", [ 63, 64, 65, 64 ], 5, true);
      this.sprite.animations.add("down", [ 51, 52, 53, 52 ], 5, true);
      this.sprite.frame = 52;
    } else if (name === "Blue") {
      this.sprite.animations.add("up", [ 90, 91, 92, 91 ], 5, true);
      this.sprite.animations.add("right", [ 78, 79, 80, 79 ], 5, true);
      this.sprite.animations.add("left", [ 66, 67, 68, 67 ], 5, true);
      this.sprite.animations.add("down", [ 54, 55, 56, 55 ], 5, true);
      this.sprite.frame = 55;
    } else if (name === "Farmer") {
      this.sprite.animations.add("up", [ 93, 94, 95, 94 ], 5, true);
      this.sprite.animations.add("right", [ 81, 82, 83, 82 ], 5, true);
      this.sprite.animations.add("left", [ 69, 70, 71, 70 ], 5, true);
      this.sprite.animations.add("down", [ 57, 58, 59, 58 ], 5, true);
      this.sprite.frame = 58;
    }

    // Configure movement
    this.movementDelay = 1000;
    this.nextMove = this.game.time.now + this.movementDelay;

    this.pointIndex = 0;
    if (strategy === "line") {
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
    // Skip if our strategy is to stand still
    if (!this.strategy) return;

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
    let angle = this.game.math.angleBetween(
      this.sprite.x,
      this.sprite.y,
      nextPoint.x,
      nextPoint.y
    );
    if (angle < 0) angle += this.game.math.degToRad(360);

    // Determine the direction to target
    const topRight = this.game.math.degToRad(315);
    const topLeft = this.game.math.degToRad(225);
    const bottomLeft = this.game.math.degToRad(135);
    const bottomRight = this.game.math.degToRad(45);
    var direction = "right";
    if (angle > bottomRight && angle < bottomLeft) direction = "down";
    else if (angle > bottomLeft && angle < topLeft) direction = "left";
    else if (angle > topLeft && angle < topRight) direction = "up";

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
