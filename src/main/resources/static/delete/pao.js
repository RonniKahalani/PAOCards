"use strict";

//export default { loadData, restartQuiz, nextQuizCard, startQuiz, checkRevealAll, revealAll, shuffleDeck}

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
const btnQuizPrev = document.getElementById("btn-quiz-prev");

let currentLociIndex = 1;
let currentMatrix = null;
let currentQuiz = null;
let currentPalace = null;

/**
 * Navigates to the previous palace loci. If we're currently at the first loci it navigates to the last loci.
 */
function prevLoci() {
    document.getElementById("palace-loci-" + currentLociIndex).style.display = "none";
    currentLociIndex = (currentLociIndex === 1) ? 18 : currentLociIndex - 1;
    document.getElementById("palace-loci-" + currentLociIndex).style.display = "block";
}

/**
 * Navigates to the next palace loci. If we're currently at the last loci it navigates to the first loci.
 */
function nextLoci() {
    document.getElementById("palace-loci-" + currentLociIndex).style.display = "none";
    currentLociIndex = (currentLociIndex === 18) ? 1 : currentLociIndex + 1;

    document.getElementById("palace-loci-" + currentLociIndex).style.display = "block";
}

/**
 * Renders the palace.
 * @param palace
 */
function renderPalace(palace) {

    let palaceLabel = null;
    let palaceInfo = null;
    let palaceImage = null;
    let palaceItem = null;
    let card = null;
    let palacePhrase = null;

    currentLociIndex = 1;
    document.getElementById("palace-loci-" + currentLociIndex).style.display = "block";

    for (let i = 0; i < 52; i++) {
        let index = i + 1;
        /*
        let currentPalaceEntry = palace[i];

        palaceLabel = document.getElementById("palace-label-" + index);
        palaceLabel.innerHTML = (i + 1) + ". " + currentPalaceEntry.label;

        palaceInfo = document.getElementById("palace-info-" + index);
        palaceInfo.innerHTML = currentPalaceEntry.info;

        palaceImage = document.getElementById("palace-image-" + index);
        palaceImage.src = "<img src='" + currentPalaceEntry.image + "' alt=''>";
*/
        palaceItem = document.getElementById("palace-item-" + index);
        card = quizCards[i];

        palaceItem.innerHTML = "<img src='" + getSVGCardImageUrl(getCardId(card), card.suit) + "' class='card' alt=''>";

        if (i > 0 && (i + 1) % 3 === 0) {
            palacePhrase = document.getElementById("palace-phrase-" + ((i + 1) / 3));
            palacePhrase.innerHTML = quizCards[i - 2].pao.person + ", " + quizCards[i - 1].pao.action + ", " + quizCards[i].pao.object;
        }

        if (i === 51) {
            palacePhrase = document.getElementById("palace-phrase-18");
            palacePhrase.innerHTML = quizCards[i].pao.person;
        }

    }
}

/**
 * Returns the path to the given SVG card image.
 * @param cardId
 * @param suit
 * @returns {string}
 */
function getSVGCardImageUrl(cardId, suit) {
    return "svg/cards/" + cardId.toLowerCase() + "_of_" + suit.toLowerCase() + ".svg";
}

/**
 * Returns a text-/char-based icon for a given suit.
 * @param suit
 * @returns {string}
 */
function getSuitIcon(suit) {
    switch (suit) {
        case "Hearts":
            return "♥";
        case "Spades":
            return "♠";
        case "Diamonds":
            return "♦";
        case "Clubs":
            return "♣";
    }
}

/**
 * Returns the text-based id/name of a given card (ACE,2...10, Jack, Queen, King).
 * @param card
 * @returns {*|string}
 */
function getCardId(card) {
    let value = card.value;
    switch (true) {
        case (value > 1 && value < 11):
            return value + "";
        default:
            return card.name;
    }
}

/**
 * Starts the quiz.
 */
function startQuiz() {
    currentQuizIndex = -1;
    stopTime();
    quiz.style.display = "block";
    quizFront.style.display = "none";
    nextQuizCard();
    startWatch();
    //$.notify("Cool! Lets go.",{position:"bottom right",className:"success"});

}

/**
 * Restarts the quiz.
 */
function restartQuiz() {
    startQuiz();
}

/**
 * Comparator function used for sorting cards.
 * @param a
 * @param b
 * @returns {number|number}
 */
function cardNameSorter(a, b) {
    let as = a.split(" ");
    let bs = b.split(" ");
    let x = parseInt(as[0]);
    let y = parseInt(bs[0]);
    if (x < y) return -1;  // any negative number works
    if (x > y) return 1;   // any positive number works
    return (as[3] < bs[3]) ? -1 : 1; // equal values MUST yield zero
}

/**
 * Set options to a given select element.
 * @param elem
 * @param values
 */
function setQuizSelectOptions(elem, values) {
    for (let i = 0; i < 52; i++) {
        let opt = document.createElement('option');
        opt.value = values[i];
        opt.innerHTML = values[i];
        elem.appendChild(opt);
    }
}

/**
 * Handles a selection in the person select.
 * @param select
 */
function quizPersonChange(select) {
    let selectValue = select.options[select.selectedIndex].value;
    let correctValue = quizCards[currentQuizIndex].pao.person;

    setSelectColor(select, selectValue === correctValue);
    if (isAllCorrect()) notifyAllCorrect();
}

/**
 * Handles a selection in the action select.
 * @param select
 */
function quizActionChange(select) {
    let selectValue = select.options[select.selectedIndex].value;
    let correctValue = quizCards[currentQuizIndex].pao.action;

    setSelectColor(select, selectValue === correctValue);
    if (isAllCorrect()) notifyAllCorrect();
}

/**
 * Handles a selection in the object select.
 * @param select
 */
function quizObjectChange(select) {
    let selectValue = select.options[select.selectedIndex].value;
    let correctValue = quizCards[currentQuizIndex].pao.object;

    setSelectColor(select, selectValue === correctValue);
    if (isAllCorrect()) notifyAllCorrect();
}

/**
 * Handles a selection in the card select.
 * @param select
 */
function quizCardChange(select) {
    let selectValue = select.options[select.selectedIndex].value;
    let correctValue = quizCards[currentQuizIndex].value + " (" + quizCards[currentQuizIndex].name + ") of " + quizCards[currentQuizIndex].suit;

    setSelectColor(select, selectValue === correctValue);
    if (isAllCorrect()) notifyAllCorrect();
}

/**
 * Sets a select background color based on if it is a correct value, wrong value or the first neutral entry.
 * @param select
 * @param isCorrect
 */
function setSelectColor(select, isCorrect) {
    if (select.selectedIndex === 0) {
        select.classList.remove("quiz-select-wrong");
        select.classList.remove("quiz-select-correct");
        select.classList.add("quiz-select-neutral");
        return;
    }

    if (isCorrect) {
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

/**
 * Returns true if all quiz select values are correct.
 * @returns {boolean}
 */
function isAllCorrect() {
    return quizPerson.classList.contains("quiz-select-correct") &&
        quizAction.classList.contains("quiz-select-correct") &&
        quizObject.classList.contains("quiz-select-correct") &&
        quizCard.classList.contains("quiz-select-correct");
}

/**
 * Notify if all quiz select values are correct.
 */
function notifyAllCorrect() {
    //$.notify("Congratulation! You just completed the " + (currentQuizIndex+1) + " quiz question. Click the next button.",{position:"bottom right",className:"success"});
}

/**
 * Navigates to the previous quiz card.
 */
function prevQuizCard() {
    clearSelects();
    currentQuizIndex = currentQuizIndex > 0 ? currentQuizIndex - 1: 51;
    quizImage.src = quizCards[currentQuizIndex].pao.image;
    autoReveal();
    cardCounter.innerHTML = (currentQuizIndex + 1).toString();
    //btnQuizPrev.disabled = isQuizDone();
}

/**
 * Navigates to the next quiz card.
 */
function nextQuizCard() {
    clearSelects();
    currentQuizIndex = currentQuizIndex < 51 ? currentQuizIndex + 1: 0;
    quizImage.src = quizCards[currentQuizIndex].pao.image;
    autoReveal();
    cardCounter.innerHTML = (currentQuizIndex + 1).toString();
    //btnQuizNext.disabled = isQuizDone();
}

/**
 * Returns true if the quiz is done.
 * TODO: Should instead validate that all cards has been answered correctly.
 * @returns {boolean}
 */
function isQuizDone() {
    return false;
}

/**
 * Checks to see which selects should be revealed automatically.
 */
function autoReveal() {
    if (quizRevealPerson.checked) revealPerson();
    if (quizRevealAction.checked) revealAction();
    if (quizRevealObject.checked) revealObject();
    if (quizRevealCard.checked) revealCard();
}

/**
 * Toggles checking all the select checkboxes.
 * @param elem
 */
function checkRevealAll(elem) {
    quizRevealPerson.checked = elem.checked;
    quizRevealAction.checked = elem.checked;
    quizRevealObject.checked = elem.checked;
    quizRevealCard.checked = elem.checked;
    if (elem.checked) {
        autoReveal();
    } else {
        clearSelects();
    }
}

/**
 * Reveals al the selects.
 */
function revealAll() {
    revealPerson();
    revealAction();
    revealObject();
    revealCard();
}

/**
 * Handles a single select reveal checkbox.
 * @param elem
 */
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

    if (elem.checked) {
        reveal();
    } else {
        clearSelect(item);
    }
}

/**
 * Reveals the person select value.
 */
function revealPerson() {
    let card = quizCards[currentQuizIndex];
    let correctValue = card.pao.person;
    for (let index = 1; index < quizPerson.options.length; index++) {
        if (quizPerson.options[index].value === correctValue) {
            quizPerson.selectedIndex = index;
            setSelectColor(quizPerson, true);
            break;
        }
    }
}

/**
 * Reveals the action select value.
 */
function revealAction() {
    let card = quizCards[currentQuizIndex];
    let correctValue = card.pao.action;
    for (let index = 1; index < quizPerson.options.length; index++) {
        if (quizAction.options[index].value === correctValue) {
            quizAction.selectedIndex = index;
            setSelectColor(quizAction, true);
            break;
        }
    }
}

/**
 * Reveals the object select value.
 */
function revealObject() {
    let card = quizCards[currentQuizIndex];
    let correctValue = card.pao.object;
    for (let index = 1; index < quizPerson.options.length; index++) {
        if (quizObject.options[index].value === correctValue) {
            quizObject.selectedIndex = index;
            setSelectColor(quizObject, true);
            break;
        }
    }
}

/**
 * Reveals the card select value.
 */
function revealCard() {
    let card = quizCards[currentQuizIndex];
    let correctValue = card.value + " (" + card.name + ") of " + card.suit;
    for (let index = 1; index < quizCard.options.length; index++) {
        if (quizCard.options[index].value === correctValue) {
            quizCard.selectedIndex = index;
            setSelectColor(quizCard, true);
            break;
        }
    }
}

/**
 * Clears/resets all the selects.
 */
function clearSelects() {
    clearSelect(quizPerson);
    clearSelect(quizAction);
    clearSelect(quizObject);
    clearSelect(quizCard);
}

/**
 * Clears/resets a single select.
 * @param elem
 */
function clearSelect(elem) {
    elem.selectedIndex = 0;
    elem.classList.remove("quiz-select-wrong");
    elem.classList.remove("quiz-select-correct");
    elem.classList.add("quiz-select-neutral");
}


async function loadData() {

    currentMatrix = await loadMatrix("default");
    renderMatrix(currentMatrix);

    currentQuiz = await loadQuiz();
    renderQuiz(currentMatrix);

    currentPalace = await loadPalace("default");
    renderPalace(currentPalace);
}

async function shuffleDeck() {
    shuffle(quizCards);
    renderPalace(currentPalace);
    restartQuiz();
}

function shuffle(deck) {
    let currentIndex = deck.length;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [deck[currentIndex], deck[randomIndex]] = [
            deck[randomIndex], deck[currentIndex]];
    }
}

function renderQuiz(matrix) {

    for (let i = 0; i < quizCards.length; i++) {
        let card = quizCards[i];
        let paoIndex = card.suit.toLowerCase();
        let paoItem = matrix[paoIndex];
        card.pao = paoItem[card.value - 1];
    }

    let persons = quizCards.map(x => x.pao.person).sort();
    let actions = quizCards.map(x => x.pao.action).sort();
    let objects = quizCards.map(x => x.pao.object).sort();
    let cards = quizCards.map(x => x.value + " (" + x.name + ") of " + x.suit).sort(cardNameSorter);

    setQuizSelectOptions(quizPerson, persons);
    setQuizSelectOptions(quizAction, actions);
    setQuizSelectOptions(quizObject, objects);
    setQuizSelectOptions(quizCard, cards);
}

function renderMatrix(matrix) {

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
        let suit = matrix[matrixIndex];
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

async function loadMatrix(id) {

    const response = await fetch("http://localhost:8080/api/v1/pao/" + id);
    if (response.ok) {
        return await response.json();
    }
}

async function loadQuiz() {

    const response = await fetch("http://localhost:8080/api/v1/quiz");
    if (response.ok) {
        currentQuiz = await response.json();
        quizCards = currentQuiz["cards"];
        return currentQuiz;
    }
}

async function loadPalace(name) {

    const response = await fetch("http://localhost:8080/api/v1/palace/" + name);
    if (response.ok) {
        return await response.json();
    }
}

/*
var video = document.querySelector('#bg-video');

function toggleVideo() {
    if (video.playing) {
        video.pause() // will bring the video to a halt
        video.currentTime = 0; // brings it back to the beginning
    } else {
        video.play();
    }
}
*/