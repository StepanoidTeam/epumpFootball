'use strict';

//import {epamRushStrata} from '_stratas';
importScripts('_stratas.js');

// let attacker = epamRushStrata;
// let defender = epamRushStrata;
// let goalkeeper = goalkeeperStrata;

let attacker = noopStrata;
let defender = noopStrata;
let goalkeeper = goalkeeperStrata;

function getPlayerMove(data) {
    return [attacker, goalkeeper, defender][data.playerIndex](data);
}

onmessage = (e) => postMessage(getPlayerMove(e.data));
