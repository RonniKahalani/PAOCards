"use strict";

function showTab(id) {
   document.getElementById("pao-matrix").style.display = 'none';
   document.getElementById("pao-quiz").style.display = 'none';
   document.getElementById("pao-instructions").style.display = 'none';
   document.getElementById(id).style.display = 'block';
}

let currentQuizIndex = -1;

let quizCards = null;

const quizImage = document.getElementById("quiz-image");
const quizName = document.getElementById("quiz-select-name");
const quizAction = document.getElementById("quiz-select-action");
const quizObject = document.getElementById("quiz-select-object");
const quizCard = document.getElementById("quiz-select-card");

async function loadQuiz(matrix) {

    const response = await fetch("http://localhost:8080/api/v1/quiz");
    if(response.ok) {
        const quiz = await response.json();
        quizCards = quiz["cards"];

        for(let i = 0; i < quizCards.length; i++) {
            let card = quizCards[i];
            let paoIndex = card.suit.toLowerCase();
            let paoItem = matrix[paoIndex];
            card.pao = paoItem[card.value-1];
        }

        let names = quizCards.map(x => x.pao.name).sort();
        let actions = quizCards.map(x => x.pao.action).sort();
        let objects = quizCards.map(x => x.pao.object).sort();
        let cards = quizCards.map(x => x.name + " of " + x.suit).sort();

        setQuizSelectOptions(quizName, names);
        setQuizSelectOptions(quizAction, actions);
        setQuizSelectOptions(quizObject, objects);
        setQuizSelectOptions(quizCard, cards);

        nextQuizCard();
    }
}

function setQuizSelectOptions(elem, values) {
    for (let i = 0; i<52; i++){
        let opt = document.createElement('option');
        opt.value = values[i];
        opt.innerHTML = values[i];
        elem.appendChild(opt);
    }
}

function quizNameChange(select) {
    let selectValue = select.options[select.selectedIndex].value;
    let correctValue = quizCards[currentQuizIndex].pao.name;

    setSelectColor(select, selectValue === correctValue);
}

function quizActionChange(select) {
    let selectValue = select.options[select.selectedIndex].value;
    let correctValue = quizCards[currentQuizIndex].pao.action;

    setSelectColor(select, selectValue === correctValue);
}

function quizObjectChange(select) {
    let selectValue = select.options[select.selectedIndex].value;
    let correctValue = quizCards[currentQuizIndex].pao.object;

    setSelectColor(select, selectValue === correctValue);
}

function quizCardChange(select) {
    let selectValue = select.options[select.selectedIndex].value;
    let correctValue = quizCards[currentQuizIndex].name + " of " + quizCards[currentQuizIndex].suit;

    setSelectColor(select, selectValue === correctValue);
}

function setSelectColor(select, isCorrect) {
    if(isCorrect) {
        select.classList.remove("quiz-select-wrong");
        select.classList.add("quiz-select-correct");
        console.log("CORRECT")
    } else {
        select.classList.remove("quiz-select-correct");
        select.classList.add("quiz-select-wrong");
        console.log("WRONG")
    }
}


function nextQuizCard() {
    clearSelects();
    quizImage.src =  quizCards[++currentQuizIndex].pao.image;
}

function revealAll() {
    revealName();
    revealAction();
    revealObject();
    revealCard();
}

function revealName() {
    let correctValue = quizCards[currentQuizIndex].pao.name;
    for(let index=1; index < quizName.options.length; index++) {
        if(quizName.options[index].value === correctValue) {
            quizName.selectedIndex = index;
            setSelectColor(quizName, true);
            break;
        }
    }
}

function revealAction() {
    let correctValue = quizCards[currentQuizIndex].pao.action;
    for(let index=1; index < quizName.options.length; index++) {
        if(quizAction.options[index].value === correctValue) {
            quizAction.selectedIndex = index;
            setSelectColor(quizAction, true);
            break;
        }
    }
}

function revealObject() {
    let correctValue = quizCards[currentQuizIndex].pao.object;
    for(let index=1; index < quizName.options.length; index++) {
        if(quizObject.options[index].value === correctValue) {
            quizObject.selectedIndex = index;
            setSelectColor(quizObject, true);
            break;
        }
    }
}

function revealCard() {
    let correctValue = quizCards[currentQuizIndex].name + " of " + quizCards[currentQuizIndex].suit;
    for(let index=1; index < quizCard.options.length; index++) {
        if(quizCard.options[index].value === correctValue) {
            quizCard.selectedIndex = index;
            setSelectColor(quizCard, true);
            break;
        }
    }
}

function clearSelects() {
    quizName.selectedIndex = 0;
    setSelectColor(quizName, false);

    quizAction.selectedIndex = 0;
    setSelectColor(quizAction, false);

    quizObject.selectedIndex = 0;
    setSelectColor(quizObject, false);

    quizCard.selectedIndex = 0;
    setSelectColor(quizCard, false);
}

async function loadMatrix(id) {

    const response = await fetch("http://localhost:8080/api/v1/pao/" + id);
    if(response.ok) {
        const matrix = await response.json();

        let paoRows = document.getElementById('pao-rows').getElementsByClassName('pao-row');
        for( let rowIndex=0; rowIndex< paoRows.length; rowIndex++ ) {

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