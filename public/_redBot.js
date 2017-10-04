'use strict';

//import {epamRushStrata} from '_stratas';
importScripts('_stratas.js');

let attacker = goalkeeperStrata;
let defender = goalkeeperStrata;
let goalkeeper = goalkeeperStrata;

function getPlayerMove(data) {
    return [attacker, goalkeeper, defender][data.playerIndex](data);
}

onmessage = (e) => postMessage(getPlayerMove(e.data));
