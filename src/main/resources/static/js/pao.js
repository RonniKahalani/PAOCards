"use strict";

function showTab(id) {
   document.getElementById("pao-home").style.display = 'none';
   document.getElementById("pao-matrix").style.display = 'none';
   document.getElementById("pao-quiz").style.display = 'none';
   document.getElementById("palace").style.display = 'none';
   document.getElementById("pao-instructions").style.display = 'none';
   document.getElementById(id).style.display = 'block';
}

let currentQuizIndex = -1;

let quizCards = null;

const quizImage = document.getElementById("quiz-image");
const quizPerson = document.getElementById("quiz-select-person");
const quizAction = document.getElementById("quiz-select-action");
const quizObject = document.getElementById("quiz-select-object");
const quizCard = document.getElementById("quiz-select-card");

const quizRevealPerson = document.getElementById("quiz-reveal-person");
const quizRevealAction = document.getElementById("quiz-reveal-action");
const quizRevealObject = document.getElementById("quiz-reveal-object");
const quizRevealCard = document.getElementById("quiz-reveal-card");
const quizRevealAll = document.getElementById("quiz-reveal-all");

const cardCounter = document.getElementById("card-counter");

const quiz = document.getElementById("quiz");
const quizFront = document.getElementById("quiz-front");

const btnQuizNext = document.getElementById("btn-quiz-next");

function createPalace(palace) {

        let palaceLabel = null;
        let palaceInfo = null;
        let palaceImage = null;
        let palaceItem = null;
        let card = null;
        let palacePhrase = null;

        for (let i = 0; i < 52; i++) {
            let index = i + 1;
/*
            palaceImage = document.getElementById("palace-image-" + index);
            palaceImage.innerHTML = "<img src='" + palace[i].image + "' alt=''>";

            palaceLabel = document.getElementById("palace-label-" + index);
            palaceLabel.innerHTML = (i + 1) + ". " + palace[i].label;

            palaceInfo = document.getElementById("palace-info-" + index);
            palaceInfo.innerHTML = palace[i].info;
*/
            palaceItem = document.getElementById("palace-item-" + index);
            card = quizCards[i];

            palaceItem.innerHTML = getSuitIcon(card.suit) + " " + getCardId(card);

            if (i > 0 && (i + 1) % 3 === 0) {
                palacePhrase = document.getElementById("palace-phrase-" + ((i + 1) / 3));
                palacePhrase.innerHTML = quizCards[i - 2].pao.person + ",<br>" + quizCards[i - 1].pao.action + ",<br>" + quizCards[i].pao.object;
            }

            if (i === 51) {
                palacePhrase = document.getElementById("palace-phrase-18");
                palacePhrase.innerHTML = quizCards[i].pao.person;
            }

        }
}

function getSuitIcon(suit) {
    switch (suit) {
        case "Hearts": return "♥";
        case "Spades": return "♠";
        case "Diamonds": return "♦";
        case "Clubs": return "♣";
    }
}

function getCardId(card) {
    let value = card.value;
    switch (true) {
        case (value>1 && value < 11): return value;
        default: return card.name;
    }
}



function startQuiz() {
    $.notify("Cool! Lets go.",{position:"bottom right",className:"success"});
    currentQuizIndex = -1;
    stopTime();
    quiz.style.display = "block";
    quizFront.style.display = "none";
    nextQuizCard();
    startWatch();
}

function restartQuiz() {
    startQuiz();
}



function sorter(a, b) {
    let x = parseInt(a.split(" ")[0]);
    let y = parseInt(b.split(" ")[0]);
    if (x < y) return -1;  // any negative number works
    if (x > y) return 1;   // any positive number works
    return 0; // equal values MUST yield zero
}
function setQuizSelectOptions(elem, values) {
    for (let i = 0; i<52; i++){
        let opt = document.createElement('option');
        opt.value = values[i];
        opt.innerHTML = values[i];
        elem.appendChild(opt);
    }
}

function quizPersonChange(select) {
    let selectValue = select.options[select.selectedIndex].value;
    let correctValue = quizCards[currentQuizIndex].pao.person;

    setSelectColor(select, selectValue === correctValue);
    if(isAllCorrect()) notifyAllCorrect();
}

function quizActionChange(select) {
    let selectValue = select.options[select.selectedIndex].value;
    let correctValue = quizCards[currentQuizIndex].pao.action;

    setSelectColor(select, selectValue === correctValue);
    if(isAllCorrect()) notifyAllCorrect();
}

function quizObjectChange(select) {
    let selectValue = select.options[select.selectedIndex].value;
    let correctValue = quizCards[currentQuizIndex].pao.object;

    setSelectColor(select, selectValue === correctValue);
    if(isAllCorrect()) notifyAllCorrect();
}

function quizCardChange(select) {
    let selectValue = select.options[select.selectedIndex].value;
    let correctValue = quizCards[currentQuizIndex].value + " (" + quizCards[currentQuizIndex].name + ") of " + quizCards[currentQuizIndex].suit;

    setSelectColor(select, selectValue === correctValue);
    if(isAllCorrect()) notifyAllCorrect();
}

function setSelectColor(select, isCorrect) {
    if(select.selectedIndex === 0) {
        select.classList.remove("quiz-select-wrong");
        select.classList.remove("quiz-select-correct");
        select.classList.add("quiz-select-neutral");
        return;
    }

    if(isCorrect) {
        select.classList.remove("quiz-select-neutral");
        select.classList.remove("quiz-select-wrong");
        select.classList.add("quiz-select-correct");
        console.log("CORRECT")
    } else {
        select.classList.remove("quiz-select-neutral");
        select.classList.remove("quiz-select-correct");
        select.classList.add("quiz-select-wrong");
        console.log("WRONG")
    }
}

function isAllCorrect() {
    return quizPerson.classList.contains("quiz-select-correct") &&
        quizAction.classList.contains("quiz-select-correct") &&
        quizObject.classList.contains("quiz-select-correct") &&
        quizCard.classList.contains("quiz-select-correct");
}

function notifyAllCorrect() {
    $.notify("Congratulation! You just completed the " + (currentQuizIndex+1) + " quiz question. Click the next button.",{position:"bottom right",className:"success"});
}

function nextQuizCard() {
    clearSelects();
    quizImage.src =  quizCards[++currentQuizIndex].pao.image;
    autoReveal();
    cardCounter.innerHTML = (currentQuizIndex+1).toString();
    btnQuizNext.disabled = isQuizDone();
}

function isQuizDone() {
    return currentQuizIndex === 51;
}

function autoReveal() {
    if(quizRevealPerson.checked) revealPerson();
    if(quizRevealAction.checked) revealAction();
    if(quizRevealObject.checked) revealObject();
    if(quizRevealCard.checked) revealCard();
}

function checkRevealAll(elem) {
    quizRevealPerson.checked = elem.checked;
    quizRevealAction.checked = elem.checked;
    quizRevealObject.checked = elem.checked;
    quizRevealCard.checked = elem.checked;
    if(elem.checked) {
        autoReveal();
    } else {
       clearSelects();
    }
}
function revealAll() {
    revealPerson();
    revealAction();
    revealObject();
    revealCard();
}

function quizCheck(elem) {
    let item = null;
    let reveal = null;

    switch (elem) {
        case quizRevealPerson:
            item = quizPerson;
            reveal = revealPerson;
            break;
        case quizRevealAction:
            item = quizAction;
            reveal = revealAction;
            break;
        case quizRevealObject:
            item = quizObject;
            reveal = revealObject;
            break;
        case quizRevealCard:
            item = quizCard;
            reveal = revealCard;
            break;
    }

    if(elem.checked) {
        reveal();
    } else {
        clearSelect(item);
    }
}
function revealPerson() {
    let card = quizCards[currentQuizIndex];
    let correctValue = card.pao.person;
    for(let index=1; index < quizPerson.options.length; index++) {
        if(quizPerson.options[index].value === correctValue) {
            quizPerson.selectedIndex = index;
            setSelectColor(quizPerson, true);
            break;
        }
    }
}

function revealAction() {
    let card = quizCards[currentQuizIndex];
    let correctValue = card.pao.action;
    for(let index=1; index < quizPerson.options.length; index++) {
        if(quizAction.options[index].value === correctValue) {
            quizAction.selectedIndex = index;
            setSelectColor(quizAction, true);
            break;
        }
    }
}

function revealObject() {
    let card = quizCards[currentQuizIndex];
    let correctValue = card.pao.object;
    for(let index=1; index < quizPerson.options.length; index++) {
        if(quizObject.options[index].value === correctValue) {
            quizObject.selectedIndex = index;
            setSelectColor(quizObject, true);
            break;
        }
    }
}

function revealCard() {
    let card = quizCards[currentQuizIndex];
    let correctValue = card.value + " (" + card.name + ") of " + card.suit;
    for(let index=1; index < quizCard.options.length; index++) {
        if(quizCard.options[index].value === correctValue) {
            quizCard.selectedIndex = index;
            setSelectColor(quizCard, true);
            break;
        }
    }
}

function clearSelects() {
    clearSelect(quizPerson);
    clearSelect(quizAction);
    clearSelect(quizObject);
    clearSelect(quizCard);
}

function clearSelect(elem) {
    elem.selectedIndex = 0;
    elem.classList.remove("quiz-select-wrong");
    elem.classList.remove("quiz-select-correct");
    elem.classList.add("quiz-select-neutral");
}

async function loadData() {
    await loadQuiz(await loadMatrix("default"));
    createPalace(await loadPalace("default"));
}

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

        let persons = quizCards.map(x => x.pao.person).sort();
        let actions = quizCards.map(x => x.pao.action).sort();
        let objects = quizCards.map(x => x.pao.object).sort();
        let cards = quizCards.map(x => x.value + " (" + x.name + ") of " + x.suit).sort(sorter);

        setQuizSelectOptions(quizPerson, persons);
        setQuizSelectOptions(quizAction, actions);
        setQuizSelectOptions(quizObject, objects);
        setQuizSelectOptions(quizCard, cards);
    }
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

            let person = column.getElementsByClassName("pao-person")[0];
            person.innerHTML = card.person;

            let image = column.getElementsByClassName("pao-image")[0];
            image.innerHTML = "<img src='" + card.image+"' class='pao-image-tag' alt=''>";

            let action = column.getElementsByClassName("pao-action")[0];
            action.innerHTML = card.action;

            let object = column.getElementsByClassName("pao-object")[0];
            object.innerHTML = card.object;
        }

        }
        return matrix;
    }
}

async function loadPalace(name) {

    const response = await fetch("http://localhost:8080/api/v1/palace/" + name);
    if(response.ok) {
        return await response.json();
    }


}