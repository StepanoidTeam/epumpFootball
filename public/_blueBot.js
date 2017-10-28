'use strict';

importScripts('stratas/_index.js');

// let attacker = epamStrata;
// let defender = epamStrata;
// let goalkeeper = epamStrata;

let attacker = rushStrata;
let defender = rushStrata;
let goalkeeper = rushStrata;


function getPlayerMove(data) {
    return [attacker, goalkeeper, defender][data.playerIndex](data);
}

onmessage = (e) => postMessage(getPlayerMove(e.data));
