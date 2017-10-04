'use strict';

function goalkeeperStrata(data) {

    const currentPlayer = data.yourTeam.players[data.playerIndex];
    const ball = data.ball;

    const beAt = [50,300,600][data.playerIndex];

    const ballStop = getBallStats(ball, data.settings);

    const playerDirection = {
        x: Math.cos(currentPlayer.direction),
        y: Math.sin(currentPlayer.direction)
    };

    const ballDiff = Math.abs(ballStop.y - currentPlayer.y);

    const attackDirection = {
        x: beAt - currentPlayer.x,
        y: ballStop.y - currentPlayer.y - ball.settings.radius
    };

    return {
        direction: radiansFromVector(attackDirection),
        velocity: ballDiff
    };
}

function epamRushStrata(data) {
    const currentPlayer = data.yourTeam.players[data.playerIndex];
    const ball = data.ball;

    const ballStop = getBallStats(ball, data.settings);

    const attackDirection = {
        x: ballStop.x - currentPlayer.x - ball.settings.radius,
        y: ballStop.y - currentPlayer.y - ball.settings.radius
    };

    return {
        direction: radiansFromVector(attackDirection),
        velocity: currentPlayer.velocity + data.settings.player.maxVelocityIncrement
    };
}

function noopStrata(data) {
    return {
        direction: 0,
        velocity: 0,
    }
}

function getBallStats(ball, gameSettings) {
    const stopTime = getStopTime(ball);
    const stopDistance = ball.velocity * stopTime
        - ball.settings.moveDeceleration * (stopTime + 1) * stopTime / 2;

    let x = ball.x + stopDistance * Math.cos(ball.direction);//x  vector part
    let y = Math.abs(ball.y + stopDistance * Math.sin(ball.direction));//y vector part

    // check the reflection from field side
    //todo: check for correctness/less
    if (y > gameSettings.field.height) y = 2 * gameSettings.field.height - y;

    return {stopTime, stopDistance, x, y};
}

function getDirectionTo(startPoint, endPoint) {
    return Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
}

function getDistance(point1, point2) {
    return Math.hypot(point1.x - point2.x, point1.y - point2.y);
}

function getStopTime(ball) {
    return ball.velocity / ball.settings.moveDeceleration;
}

function radiansFromVector({x, y}) {
    return Math.atan2(y, x);
}


//todo: do i need these?
function radians(degrees) {
    return degrees * Math.PI / 180;
}

function degrees(radians) {
    return radians * 180 / Math.PI;
}