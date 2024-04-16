"use strict";

import {Matrix} from "./matrix.js";
import {Quiz} from "./quiz.js";
import {TabHandler} from "./tab.js";

const matrix = new Matrix();
const quiz = new Quiz(matrix);
const tab = new TabHandler();

window.addEventListener('DOMContentLoaded',start);
function start() {
     setupEvents();
}
function setupEvents() {
    setupTabEvents();
}

function setupTabEvents() {
    document.getElementById("btn-home").addEventListener('click',()=>{
        tab.showTab("pao-home");
    });

    document.getElementById("btn-matrix").addEventListener('click',()=>{
        tab.showTab("pao-matrix");
    });

    document.getElementById("btn-quiz").addEventListener('click',()=>{
        tab.showTab("pao-quiz");
    });

    document.getElementById("btn-palace").addEventListener('click',()=>{
        tab.showTab("pao-palace");
    });

    document.getElementById("btn-instructions").addEventListener('click',()=>{
        tab.showTab("pao-instructions");
    });
}