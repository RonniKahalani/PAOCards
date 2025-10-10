"use strict";
/*
Copyright (c) 2025 Ronni Kahalani

X: https://x.com/RonniKahalani
Website: https://learningisliving.dk
LinkedIn: https://www.linkedin.com/in/kahalani/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/**
 * Main app script used to initialize the app.
 */
import {Matrix} from "./matrix.js";
import {Quiz} from "./quiz.js";
import {TabHandler} from "./tab.js";

const tabHandler = new TabHandler();
window.addEventListener('DOMContentLoaded', start);

/**
 * Starts the app.
 * @returns {Promise<void>}
 */
async function start() {

    const matrix = new Matrix();
    try {
        await matrix.load("default");
        const quiz = new Quiz(matrix.currentMatrix);
        await quiz.load();
        setupEvents();
    } catch (e) {
        showError("An error occurred.", e);
    }
}

function showError(msg, status) {
    alert(msg + "\nReason: " + status.toString());
}

/**
 * Sets up the app events.
 */
function setupEvents() {
    setupTabEvents();
}

/**
 * Sets up the tab events.
 */
function setupTabEvents() {
    document.getElementById("btn-home").addEventListener('click', () => {
        tabHandler.showTab("pao-home");
    });

    document.getElementById("btn-matrix").addEventListener('click', () => {
        tabHandler.showTab("pao-matrix");
    });

    document.getElementById("btn-quiz").addEventListener('click', () => {
        tabHandler.showTab("pao-quiz");
    });

    document.getElementById("btn-palace").addEventListener('click', () => {
        tabHandler.showTab("pao-palace");
    });

    document.getElementById("btn-instructions").addEventListener('click', () => {
        tabHandler.showTab("pao-instructions");
    });
}