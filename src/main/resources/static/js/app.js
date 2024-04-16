"use strict";

import {Matrix} from "./matrix.js";
import {Quiz} from "./quiz.js";
import {TabHandler} from "./tab.js";

const matrix = new Matrix();
const quiz = new Quiz(matrix);
const tabHandler = new TabHandler();

window.addEventListener('DOMContentLoaded',start);
function start() {
     setupEvents();
}
function setupEvents() {
    setupTabEvents();
}

function setupTabEvents() {
    document.getElementById("btn-home").addEventListener('click',()=>{
        tabHandler.showTab("pao-home");
    });

    document.getElementById("btn-matrix").addEventListener('click',()=>{
        tabHandler.showTab("pao-matrix");
    });

    document.getElementById("btn-quiz").addEventListener('click',()=>{
        tabHandler.showTab("pao-quiz");
    });

    document.getElementById("btn-palace").addEventListener('click',()=>{
        tabHandler.showTab("pao-palace");
    });

    document.getElementById("btn-instructions").addEventListener('click',()=>{
        tabHandler.showTab("pao-instructions");
    });
}