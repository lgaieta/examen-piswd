class Ball {
  constructor({
    x,
    y,
    size,
    directionX,
    directionY,
    velocityX,
    velocityY,
    color,
  }) {
    this.x = x || 200;
    this.y = y || 400;
    this.size = size || 20;
    this.directionX = directionX || 1;
    this.directionY = directionY || -1;
    this.velocityX = velocityX || 8;
    this.velocityY = velocityY || 8;
    this.color = color || ["#FFFFFF"];
  }

  move() {
    this.x += this.velocityX * this.directionX;
    this.y += this.velocityY * this.directionY;
  }

  getTop() {
    return this.y - this.size / 2;
  }

  getBottom() {
    return this.y + this.size / 2;
  }

  getRight() {
    return this.x + this.size / 2;
  }

  getLeft() {
    return this.x - this.size / 2;
  }

  turnXDirection() {
    this.directionX *= -1;
  }

  turnYDirection() {
    this.directionY *= -1;
  }

  draw() {
    fill(...this.color);
    ellipse(this.x, this.y, this.size, this.size);
    fill("#FFFFFF");
  }
}

function checkBallCollisionsWithCanvas({
  ball,
  onTop,
  onRight,
  onBottom,
  onLeft,
}) {
  if (ball.getRight() > width) return onRight();

  if (ball.getLeft() < 0) return onLeft();

  if (ball.getTop() < 0) return onTop();

  if (ball.getBottom() > height) return onBottom();
}

function checkTwoBallsCollisions({
  firstBall,
  secondBall,
  onHorizontal,
  onVertical,
}) {
  const distanceBetweenBalls = dist(
    firstBall.x,
    firstBall.y,
    secondBall.x,
    secondBall.y
  );

  if (distanceBetweenBalls < firstBall.size / 2 + secondBall.size / 2) {
    if (firstBall.directionX !== secondBall.directionX) {
      onHorizontal();
    }
    if (firstBall.directionY !== secondBall.directionY) {
      onVertical();
    }
  }
}

const ball1 = new Ball({
  x: 100,
  y: 100,
  velocityX: 4,
  velocityY: 4,
  color: [0, 0, 255],
  size: 40,
});

const ball2 = new Ball({
  x: 100,
  y: 400,
  velocityX: 8,
  velocityY: 8,
  color: [255, 0, 0],
  size: 40,
});

function setup() {
  createCanvas(600, 400);
}

const getRandomByte = () => Math.random() * 255;

let violetFrame = 0;

function draw() {
  background(230);

  if (violetFrame > 0) {
    ball2.color = [...ball2.color.slice(0, -1), violetFrame * 2];
    ball1.color = [violetFrame * 2, ...ball1.color.slice(1)];
    violetFrame--;
  }

  checkBallCollisionsWithCanvas({
    ball: ball1,
    onTop: () => {
      ball1.y = 0 + ball1.size / 2;
      ball1.turnYDirection();
    },
    onBottom: () => {
      ball1.y = height - ball1.size / 2;
      ball1.turnYDirection();
      ball1.color = [0, 0, Math.max(150, getRandomByte())];
    },
    onRight: () => {
      ball1.x = width - ball1.size / 2 - 1;
      ball1.turnXDirection();
    },
    onLeft: () => {
      ball1.x = 0 + ball1.size / 2;
      ball1.turnXDirection();
    },
  });

  checkBallCollisionsWithCanvas({
    ball: ball2,
    onTop: () => {
      ball2.y = 0 + ball2.size / 2;
      ball2.turnYDirection();
      ball2.color = [Math.max(150, getRandomByte()), 0, 0];
    },
    onBottom: () => {
      ball2.y = height - ball2.size / 2;
      ball2.turnYDirection();
    },
    onRight: () => {
      ball2.x = width - ball2.size / 2 - 1;
      ball2.turnXDirection();
    },
    onLeft: () => {
      ball2.x = 0 + ball2.size / 2;
      ball2.turnXDirection();
    },
  });

  checkTwoBallsCollisions({
    firstBall: ball1,
    secondBall: ball2,
    onHorizontal: () => {
      ball1.turnXDirection();
      ball2.turnXDirection();
      violetFrame = 90;
    },
    onVertical: () => {
      ball1.turnYDirection();
      ball2.turnYDirection();
      violetFrame = 90;
    },
  });

  ball1.move();
  ball1.draw();
  ball2.move();
  ball2.draw();
}
