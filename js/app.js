// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 50;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.checkOffScreen = function() {
    if (this.x + this.width < 0 || CANVAS_WIDTH < this.x) {
        this.x = -this.width;
    };
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * this.speed);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var OriginLocation = {
    x: 200,
    y: 380
};

var Player = function() {
    this.x = OriginLocation.x;
    this.y = OriginLocation.y;
    this.width = 98;
    this.height = 90;
    this.stepLenghtX = 100;
    this.stepLenghtY = 80;
    this.sprite = 'images/char-princess-girl.png';
}

Player.prototype.resetLocation = function() {
    this.x = OriginLocation.x;
    this.y = OriginLocation.y;
};

Player.prototype.update = function() {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(pressedKey) {
    switch (pressedKey){
        case 'left':
            var nextX = this.x - this.stepLenghtX;
            if (isInsideCanvas(nextX, this.y)) {
                this.x = nextX;
            } else {
                this.x = 0;
            };
            break;
        case 'right':
            nextX = this.x + this.stepLenghtX;
            if (isInsideCanvas(nextX + this.width, this.y)) {
                this.x = nextX;
            } else {
                this.x = CANVAS_WIDTH - this.width;
            };
            break;
        case 'up':
            nextY = this.y - this.stepLenghtY;
            if (isInsideCanvas(this.x, nextY)) {
                this.y = nextY;
            } else {
                if (nextY <= 45) {
                    this.resetLocation();
                    winAction();
                }
            };
            break;
        case 'down':
            nextY = this.y + this.stepLenghtY;
            if (isInsideCanvas(this.x, nextY + this.height + CANVAS_OFFSET_HEIGHT)) {
                this.y = nextY;
            } else {
                this.y = CANVAS_HEIGHT - CANVAS_OFFSET_HEIGHT - this.height
            };
            break;
        default:
            console.log("error in handle key");
    }
};

var isInsideCanvas = function (x,y) {
    var isInsideX = (0 <= x && x <= CANVAS_WIDTH);
    var isInsideY = (0 <= y && y <= CANVAS_HEIGHT);
    return (isInsideX && isInsideY);
};

var winAction = function () {
    console.log("hello,world");
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
