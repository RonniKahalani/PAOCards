"use strict";

import {Matrix} from "./matrix.js";
import {Quiz} from "./quiz.js";
import {TabHandler} from "./tab.js";



const tabHandler = new TabHandler();

window.addEventListener('DOMContentLoaded',start);

async function start() {
    const matrix = new Matrix();
    await matrix.load("default");
    const quiz = new Quiz(matrix.currentMatrix);
    await quiz.load();
     setupEvents();
}
function setupEvents() {
    setupTabEvents();
    setMatrixEvents();
    setupChatEvents();
}

function setMatrixEvents() {

}

function setupChatEvents() {


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