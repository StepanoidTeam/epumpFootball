importScripts('stratas/_helpers.js');

function goalkeeperStrata(data) {
    const currentPlayer = data.yourTeam.players[data.playerIndex];
    const ball = data.ball;

    const ballStop = getBallStats(ball, data.settings);
    const playerDirection = getPlayerDir(data);


    const def1 = {x: 200, y: 100};
    const def2 = {x: 200, y: 370};

    const defPoints = [def1, def2];


    const isAttacker = canAttack(data, currentPlayer);
    const isNearestToBall = playerIsNearestTo(data, currentPlayer, data.ball);
    const isNearestToBallStop = playerIsNearestTo(data, currentPlayer, ballStop);


    //todo: realize treugolnik
    //const isForward = //todo: nearest to ball

    const maxFit = maxFitness(data);

    const fitEnough = maxFit === getFitness(data, currentPlayer);


    if (!isAttacker && fitEnough) {
        //ball is on backward
        const ballDeadZone = ball.settings.radius * 3;

        const topPoint = {
            x: ball.x - ball.settings.radius,
            y: ball.y + ballDeadZone
        };
        const bottomPoint = {
            x: ball.x - ball.settings.radius,
            y: ball.y - ballDeadZone
        };

        let nearestDeadPoint = getNearestToPoint(currentPlayer, topPoint, bottomPoint);


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

    if (isAttacker && fitEnough) {
        //ball is on front

        // const dir = {
        //     x: ballStop.x - currentPlayer.x,
        //     y: ballStop.y - currentPlayer.y
        // };

        // const dir = {
        //     x: ball.x - ball.settings.radius - currentPlayer.x,
        //     y: ball.y - currentPlayer.y
        // };

        const dir = {
            x: ballStop.x - ball.settings.radius - currentPlayer.x,
            y: ballStop.y - currentPlayer.y
        };


        return {
            direction: radiansFromVector(dir),
            velocity: 10
        };
    }


    //def strata



    defPoints



    //noop
    return {
        direction: 0,
        velocity: 0,
    };

}