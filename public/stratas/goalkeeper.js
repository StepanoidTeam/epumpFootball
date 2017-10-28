importScripts('stratas/_helpers.js');

function goalkeeperStrata(data) {
    const currentPlayer = data.yourTeam.players[data.playerIndex];
    const ball = data.ball;
    const ballStop = getBallStats(ball, data.settings);


    const playerDirection = getPlayerDir(data);


    const isOffside = currentPlayer.x > ball.x - ball.settings.radius;

    //const ballDiff = Math.abs(ballStop.y - currentPlayer.y);

    const attackDirection = {
        x: ballStop.x - currentPlayer.x,
        y: ballStop.y - currentPlayer.y
    };

    if (isOffside) {
        //ball is on backward
        const ballDeadZone = ball.settings.radius * 3;

        const topPoint = {x: ball.x - ball.settings.radius, y: ball.y + ballDeadZone};
        const bottomPoint = {x: ball.x - ball.settings.radius, y: ball.y - ballDeadZone};

        let nearestDeadPoint = getNearestPoint(currentPlayer, topPoint, bottomPoint);


        const dir = {
            x: nearestDeadPoint.x - currentPlayer.x,
            y: nearestDeadPoint.y - currentPlayer.y,
        };

        const velo = getDistance(currentPlayer, ball) / ball.settings.radius;

        return {
            direction: radiansFromVector(dir),
            velocity: velo,
        }
    }

    if (!isOffside) {
        //ball is on front
        return {
            direction: radiansFromVector(attackDirection),
            velocity: 10
        };
    }

    //noop?
}