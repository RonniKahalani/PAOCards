"user strict";

export class Matrix {
    constructor() {
        this.currentMatrix = null;

    }

    async load(id) {
        this.currentMatrix = await this.loadMatrix(id);
        this.renderMatrix();
    }

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
            for (let i = 0; i < paoColumns.length; i++) {
                let card = suit[i];
                let column = paoColumns[i];

                let person = column.getElementsByClassName("pao-person")[0];
                person.innerHTML = card.person;

                let image = column.getElementsByClassName("pao-image")[0];
                image.src = card.image;
                let cardId = getCardId(card);
                image.addEventListener('mouseover', function () {
                    image.src = getSVGCardImageUrl(cardId, matrixIndex);
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

    async loadMatrix(id) {

        const response = await fetch("http://localhost:8080/api/v1/pao/" + id);
        if (response.ok) {
            return await response.json();
        }
    }

}