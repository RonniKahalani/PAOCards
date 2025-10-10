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
 * Handles the matrix feature.
 */
import {CardUtil} from "./card-util.js";

/**
 * The matrix feature.
 */
export class Matrix {

    /**
     * Constructor.
     */
    constructor() {
        this.BASE_ENDPOINT = "http://localhost:8080/api/v1/";

        this.currentMatrix = null;
        this.cardUtil = new CardUtil();
    }

    /**
     * Loads and renders the matrix.
     * @param id
     * @returns {Promise<void>}
     */
    async load(id) {
        this.currentMatrix = await this.loadMatrix(id);
        this.renderMatrix();
    }

    /**
     * Renders the matrix interface.
     */
    renderMatrix() {

        let paoRows = document.getElementById('pao-rows').getElementsByClassName('pao-row');
        for (let rowIndex = 0; rowIndex < paoRows.length; rowIndex++) {

            let paoColumns = paoRows[rowIndex].getElementsByClassName('pao-column');

            let matrixIndex = -1;
            switch (rowIndex) {
                case 0:
                    matrixIndex = "hearts";
                    break;
                case 1:
                    matrixIndex = "spades";
                    break;
                case 2:
                    matrixIndex = "diamonds";
                    break;
                case 3:
                    matrixIndex = "clubs";
                    break;
            }
            let suit = this.currentMatrix[matrixIndex];
            let svgFunc = this.cardUtil.getSVGCardImageUrl;

            for (let i = 0; i < paoColumns.length; i++) {
                let card = suit[i];
                let column = paoColumns[i];

                let person = column.getElementsByClassName("pao-person")[0];
                person.innerHTML = card.person;

                let image = column.getElementsByClassName("pao-image")[0];
                image.src = card.image;
                let cardId = this.cardUtil.getCardId(card);

                image.addEventListener('mouseover', function () {
                    image.src = svgFunc(cardId, matrixIndex);
                })
                image.addEventListener('mouseout', function () {
                    image.src = card.image;
                })

                let action = column.getElementsByClassName("pao-action")[0];
                action.innerHTML = card.action;

                let object = column.getElementsByClassName("pao-object")[0];
                object.innerHTML = card.object;
            }
        }
    }

    /**
     * Loads the matrix from its REST endpoint.
     * @param id
     * @returns {Promise<any>}
     */
    async loadMatrix(id) {
        try {
            const response = await fetch(this.BASE_ENDPOINT + "pao/" + id);
            if (response.ok) {
                return await response.json();
            }
        } catch (e) {
            throw new Error("Failed to fetch matrix data");
        }
    }
}