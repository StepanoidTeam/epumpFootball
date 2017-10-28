importScripts('stratas/_helpers.js');

function rushStrata(data) {
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
