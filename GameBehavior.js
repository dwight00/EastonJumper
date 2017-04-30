/**
 * Created by drodger on 4/1/17.
 */

var jumpStartTime = 0;
var shark_direction = [];    // 1 right, -1 left
var faller_touched = [];    // true = it was touched

function startTimer() {
    jumpStartTime = (new Date().getTime()) / 1000;
}
function timerTime() {
    var currentTime = (new Date().getTime()) / 1000;
    if (level == 7) {
        return (currentTime - jumpStartTime) * 3/2;
    }
    else {
        return currentTime - jumpStartTime;
    }
}
function weAreOnAFaller(x, y) {
    var isOnFaller = false;
    faller.forEach(function (f, i) {
        if (faller_x[i] == Math.floor(x) &&
           Math.floor(faller_y[i]) == Math.floor(y)) {
            isOnFaller = true;
        }
    });
    return isOnFaller;
}
function doBehaviors(upIsPressed, downIsPressed, leftIsPressed, rightIsPressed, x, y, isNewJump) {
    // things to do
    // win
    if (rightIsPressed) {
        // check if the block to our right is a space
        if (getBlockType(x+1,y) != 1) {
            if (getBlockType(x,y) == 7) {
                // moving in quick sand is very slow
                x = x + 1 / 50;
            }
            else {
                x = x + 1/8;
            }
        }
    }
    if (leftIsPressed) {
        // check if the block to our left is a space
        if (getBlockType(x-1, y) != 1) {
            if (getBlockType(x,y) == 7) {
                // moving in quick sand is very slow
                x = x - 1 / 50;
            }
            else {
                x = x - 1 / 8;
            }
        }
    }
    if (upIsPressed) {
        // check if the block below us is ground
        if (getBlockType(x,y+1) == 1 ||
           getBlockType(x,y) == 4 ||
           getBlockType(x,y) == 5 ||
           weAreOnAFaller(x,y)) {
            startTimer();
        }
        if (timerTime() < 1/2) {
            // check if the block above us is a space
            if (getBlockType(x,y-1) != 1) {
                y = y - (5/7 - 1/2 + 1/3);
            }
        }
        // to jump in quick sand needs to press up repeatedly
        if (getBlockType(x,y) == 7 && isNewJump) {
            y = y - 1/4;
        }
    }
    // check if the block below is a space
    if (getBlockType(x, y+1) != 1) {
        if (getBlockType(x, y) == 7) {
            // falling in quick sand is slow
            y = y + 1/90;
        }
        else if (getBlockType(x, y) == 4 || (getBlockType(x, y)) == 5) {
            // falling in water
            y = y + 1/9;
        }
        else {
            // normal falling
            y = y + 1/3;
        }
    }
    newX = x;
    newY = y;

    if (getBlockType(x, y) == 8) {
        faller.forEach(function(f, i) {
            if (faller_x[i] == Math.floor(x) &&
                faller_y[i] == Math.floor(y)) {
                faller_touched[i] = true;
            }
        });
    }
    if (getBlockType(x, y) == 2) {
        youWon = true;
    }
    if (getBlockType(x, y) == 3) {
        youLost = true;
    }
    if (getBlockType(x, y) == 6) {
        youLost = true;
    }
    if (y > 30) {
        youLost = true;
    }


    faller.forEach(function(f,i) {
        if (faller_touched[i]) {
            faller_y[i] = faller_y[i] + 1/3;
        }
    });

    // shark behavior
    shark.forEach(function(s,i) {
        if (shark_direction[i] == 1) {
            if (getBlockType(shark_x[i]+3,shark_y[i]) == 1) {
                shark_direction[i] = -1;
            }
            else {
                shark_x[i] = shark_x[i] + 1/16;
            }
        }
        else {
            if (getBlockType(shark_x[i],shark_y[i]) == 1) {
                shark_direction[i] = 1;
            }
            else {
                shark_x[i] = shark_x[i] - 1/16;
            }
        }

        if (x < shark_x[i]+3 &&
            x > shark_x[i] &&
            y < shark_y[i]+1 &&
            y > shark_y[i]) {
            youLost = true;
        }
    });
}
