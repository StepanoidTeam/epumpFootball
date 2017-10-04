//  Simple strategy : split the field into 3 parts (with 1:2:3 proportion) and each player will control its part.
//
//  Player 0 - goalkeeper
//  Player 1 - defender
//  Player 3 - playmaker
//  /-----------------------+
//  |   |      |            |
//  |   |      |            |
//  | 0 |  1   |     2      |
//  |   |      |            |
//  |   |      |            |
//  \-----------------------+
//
//  Each player is responcible to kick out the ball from its zone.
'use strict';

function getPlayerMove(data) {
  const currentPlayer = data.yourTeam.players[data.playerIndex];
  const sixthPartOfFieldWidth = data.settings.field.width / 6;
  const playerZoneStartX = sixthPartOfFieldWidth * [0, 1, 3][data.playerIndex];
  const playerZoneWidth = sixthPartOfFieldWidth * [1, 2, 3][data.playerIndex];

  const ball = data.ball;

  const ballStop = getBallStats(ball, data.settings);
  let direction = currentPlayer.direction;
  let velocity = currentPlayer.velocity;

  if ((ballStop.x > playerZoneStartX) && (ballStop.x < playerZoneStartX + playerZoneWidth)) {
    // ball stops in the current player zone
    if (ballStop.x > currentPlayer.x) {
       // can go and kick it to the opponent side
       direction = getDirectionTo(currentPlayer, ballStop);
       velocity = data.settings.player.maxVelocity; // dont care about acceleration, game engine reduce it to max allowed value
    } else {
       // do not kick to the my goalpost, move to the position behind the ball
       const ballRadius = ball.settings.radius;
       const stopPoint = {
           x: ballStop.x - ballRadius * 2,
           y: ballStop.y + (ballStop.y > currentPlayer.y ? -ballRadius : +ballRadius) * 2
       };
       direction = getDirectionTo(currentPlayer, stopPoint);
       velocity = getDistance(currentPlayer, stopPoint);
    }
  } else {
    // ball stops in the other player zone, let move the current player to its zone and wait
    const zonePoint = {
        x: playerZoneStartX + 10,
        y: ball.y + Math.random() * 40 - 20
    };
    direction = getDirectionTo(currentPlayer, zonePoint);
    velocity = getDistance(currentPlayer, zonePoint) < 20 ? 0 : data.settings.player.maxVelocity;
  }

  return {
    direction: direction,
    velocity: velocity
  };
}

function getDirectionTo(startPoint, endPoint) {
  return Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
}

function getDistance(point1, point2) {
  return Math.hypot(point1.x-point2.x, point1.y - point2.y);
}

function getBallStats(ball, gameSettings) {
  const stopTime = getStopTime(ball);
  const stopDistance = ball.velocity * stopTime
    - ball.settings.moveDeceleration * (stopTime + 1) * stopTime / 2;

  const x = ball.x + stopDistance * Math.cos(ball.direction);
  let y = Math.abs(ball.y + stopDistance * Math.sin(ball.direction));

  // check the reflection from field side
  if (y > gameSettings.field.height) y = 2 * gameSettings.field.height - y;

  return { stopTime, stopDistance, x, y };
}

function getStopTime(ball) {
  return ball.velocity / ball.settings.moveDeceleration;
}


onmessage = (e) => postMessage(getPlayerMove(e.data));
