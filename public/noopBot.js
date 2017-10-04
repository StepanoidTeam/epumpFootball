'use strict';

function getPlayerMove(data) {

  return {
    direction: 0,
    velocity: 0
  };
}

onmessage = (e) => postMessage(getPlayerMove(e.data));
