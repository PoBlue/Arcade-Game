var STEP_LENGHT_X = 101;
var STEP_LENGHT_Y = 83;
var PLAYER_WIDTH = 98;
var PLAYER_HEIGHT = 90;
var ENEMY_WIDTH = 90;
var ENEMY_HEIGHT = 50;
var START_LOCATION_PLAYER_X = 200;
var START_LOCATION_PLAYER_Y = 380;

var Character = function(x, y, width, height, sprite) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = sprite;
};

Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    Character.call(this, x, y, 
        ENEMY_WIDTH, ENEMY_HEIGHT, 
        'images/enemy-bug.png');
    this.speed = speed;
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.checkOffScreen = function() {
    if (this.x + this.width < 0 || CANVAS_WIDTH < this.x) {
        this.x = -this.width;
    };
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + (dt * this.speed);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function() {
    Character.call(this, 
        START_LOCATION_PLAYER_X, START_LOCATION_PLAYER_Y, 
        PLAYER_WIDTH, PLAYER_HEIGHT, 
        'images/char-princess-girl.png');
    this.stepLenghtX = STEP_LENGHT_X;
    this.stepLenghtY = STEP_LENGHT_Y;
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.resetLocation = function() {
    this.x = START_LOCATION_PLAYER_X;
    this.y = START_LOCATION_PLAYER_Y;
};

Player.prototype.update = function() {
};

Player.prototype.handleInput = function(pressedKey) {
    switch (pressedKey){
        case 'left':
            var nextX = this.x - this.stepLenghtX;
            if (this.isInsideCanvas(nextX, this.y)) {
                this.x = nextX;
            } else {
                this.x = 0;
            };
            break;
        case 'right':
            nextX = this.x + this.stepLenghtX;
            if (this.isInsideCanvas(nextX + this.width, this.y)) {
                this.x = nextX;
            } else {
                this.x = CANVAS_WIDTH - this.width;
            };
            break;
        case 'up':
            nextY = this.y - this.stepLenghtY;
            if (this.isInsideCanvas(this.x, nextY)) {
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
            if (this.isInsideCanvas(this.x, nextY + this.height + CANVAS_OFFSET_HEIGHT)) {
                this.y = nextY;
            } else {
                this.y = CANVAS_HEIGHT - CANVAS_OFFSET_HEIGHT - this.height
            };
            break;
        default:
            console.log("error in handle key");
    }
};

Player.prototype.isInsideCanvas = function (x,y) {
    var isInsideX = (0 <= x && x <= CANVAS_WIDTH);
    var isInsideY = (0 <= y && y <= CANVAS_HEIGHT);
    return (isInsideX && isInsideY);
};

var winAction = function () {
    showMessage("Congratulation! You are Success!! Keep Moving");
};

var showMessage = function(message) {
    var messageDiv = document.getElementById("message");
    messageDiv.innerHTML = message;
};

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
