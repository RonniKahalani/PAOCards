"use strict";

export class TabHandler {

    showTab(id) {
        document.getElementById("pao-home").style.display = 'none';
        document.getElementById("pao-matrix").style.display = 'none';
        document.getElementById("pao-quiz").style.display = 'none';
        document.getElementById("pao-palace").style.display = 'none';
        document.getElementById("pao-instructions").style.display = 'none';
        document.getElementById(id).style.display = 'block';
    }
}