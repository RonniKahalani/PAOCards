"use strict";



function showTab(id) {
   document.getElementById("pao-matrix").style.display = 'none';
   document.getElementById("pao-quiz").style.display = 'none';
   document.getElementById("pao-instructions").style.display = 'none';
   document.getElementById(id).style.display = 'block';
}

async function loadQuiz(matrix) {

    const response = await fetch("http://localhost:8080/api/v1/quiz");
    if(response.ok) {
        const quiz = await response.json();
        const cards = quiz["cards"];

        for(let i = 0; i < cards.length; i++) {
            let card = cards[i];
            let paoIndex = card.suit.toLowerCase()+"s";
            let paoItem = matrix[paoIndex];
            card.pao = paoItem[card.value-1];
        }
        localStorage.setItem("quiz", quiz);
    }
}


async function loadMatrix(id) {

    const response = await fetch("http://localhost:8080/api/v1/pao/" + id);
    if(response.ok) {
        const matrix = await response.json();
        localStorage.setItem("matrix", matrix);

        let paoRows = document.getElementById('pao-rows').getElementsByClassName('pao-row');
        for( let rowIndex=0; rowIndex< paoRows.length; rowIndex++ )
        {

        let paoColumns = paoRows[rowIndex].getElementsByClassName('pao-column');

        let matrixIndex = -1;
        switch (rowIndex) {
            case 0: matrixIndex = "hearts"; break;
            case 1: matrixIndex = "spades"; break;
            case 2: matrixIndex = "diamonds"; break;
            case 3: matrixIndex = "clubs"; break;
        }
        let suit = matrix[matrixIndex];
        for(let i=0; i< paoColumns.length; i++ )
        {
            let card = suit[i];
            let column = paoColumns[i];

            let name = column.getElementsByClassName("pao-name")[0];
            name.innerHTML = card.name;

            let image = column.getElementsByClassName("pao-image")[0];
            image.innerHTML = "<img src='" + card.image+"' class='pao-image-tag' alt=''>";

            let action = column.getElementsByClassName("pao-action")[0];
            action.innerHTML = card.action;

            let object = column.getElementsByClassName("pao-object")[0];
            object.innerHTML = card.object;
        }

        }
        await loadQuiz(matrix);
        return matrix;
    }

}