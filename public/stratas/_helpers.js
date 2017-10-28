'use strict';


//todo: go to ball nearest stop, not the final one
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


function getNearestToPoint(targetPoint, ...points) {
    let pts = points.map(p => ({
        point: p,
        distance: getDistance(targetPoint, p)
    }));

    let minPoint = pts.reduce((min, current) =>
        min.distance > current.distance ? current : min);

    return minPoint.point;
}


function getNearestPlayerTo(data, point) {
    return getNearestToPoint(point, ...data.yourTeam.players);
}

function playerIsNearestTo(data, player, point) {
    return getNearestPlayerTo(data, point) === player;
}

function canAttack(data, player) {
    return player.x < data.ball.x - data.ball.settings.radius;
}

function maxFitness(data) {
    return Math.max(...data.yourTeam.players.map(player => getFitness(data, player)));
}

function getFitness(data, player) {
    const ballStop = getBallStats(data.ball, data.settings);

    return canAttack(data, player)
        + (playerIsNearestTo(data, player, data.ball)
        || playerIsNearestTo(data, player, ballStop));
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

function getPlayerDir(data) {
    const currentPlayer = data.yourTeam.players[data.playerIndex];
    return {
        x: Math.cos(currentPlayer.direction),
        y: Math.sin(currentPlayer.direction)
    };
}