"use strict";

import {CardUtil} from "./card-util.js";
import {Timer} from "./timer.js";

export class Quiz {

    constructor(matrix) {
        this.matrix = matrix;
        this.cardUtil = new CardUtil();

        this.quizImage = document.getElementById("quiz-image");

        this.quizPerson = document.getElementById("quiz-select-person");
        this.quizPerson.addEventListener('change',()=>{
            this.quizPersonChange(this.quizPerson);
        });

        this.quizAction = document.getElementById("quiz-select-action");
        this.quizAction.addEventListener('change',()=>{
            this.quizActionChange(this.quizAction);
        });

        this.quizObject = document.getElementById("quiz-select-object");
        this.quizObject.addEventListener('change',()=>{
            this.quizObjectChange(this.quizObject);
        });

        this.quizCard = document.getElementById("quiz-select-card");
        this.quizCard.addEventListener('change',()=>{
            this.quizCardChange(this.quizCard);
        });

        this.quizRevealPerson = document.getElementById("quiz-reveal-person");
        this.quizRevealPerson.addEventListener('change',()=>{
            this.quizCheck(this.quizRevealPerson);
        });

        this.quizRevealAction = document.getElementById("quiz-reveal-action");
        this.quizRevealAction.addEventListener('change',()=>{
            this.quizCheck(this.quizRevealAction);
        });

        this.quizRevealObject = document.getElementById("quiz-reveal-object");
        this.quizRevealObject.addEventListener('change',()=>{
            this.quizCheck(this.quizRevealObject);
        });

        this.quizRevealCard = document.getElementById("quiz-reveal-card");
        this.quizRevealCard.addEventListener('change',()=>{
            this.quizCheck(this.quizRevealCard);
        });

        this.quizRevealAll = document.getElementById("quiz-reveal-all");
        this.quizRevealAll.addEventListener('change',()=>{
            this.checkRevealAll(this.quizRevealAll);
        });

        this.quiz = document.getElementById("quiz");
        this.quizFront = document.getElementById("quiz-front");

        document.getElementById("quiz-start").addEventListener('click',()=>{
            this.startQuiz();
        });

        this.btnQuizNext = document.getElementById("btn-quiz-next");
        this.btnQuizNext.addEventListener('click',()=>{
            this.nextQuizCard();
        });

        this.btnQuizPrev = document.getElementById("btn-quiz-prev");
        this.btnQuizPrev.addEventListener('click',()=>{
            this.prevQuizCard();
        });

        this.btnQuizRestart = document.getElementById("btn-quiz-restart");
        this.btnQuizRestart.addEventListener('click',()=>{
            this.restartQuiz();
        });

        this.btnQuizShuffleDeck = document.getElementById("btn-quiz-shuffle-deck");
        this.btnQuizShuffleDeck.addEventListener('click',()=>{
            this.shuffleDeck();
        });

        this.btnQuizReveal = document.getElementById("btn-quiz-reveal");
        this.btnQuizReveal.addEventListener('click',()=>{
            this.revealAll();
        });

        this.btnPrevLoci = document.getElementById("btn-prev-loci");
        this.btnPrevLoci.addEventListener('click',()=>{
            this.prevLoci();
        });

        this.btnNextLoci = document.getElementById("btn-next-loci");
        this.btnNextLoci.addEventListener('click',()=>{
            this.nextLoci();
        });

        this.cardCounter = document.getElementById("card-counter");
        this.currentQuiz = null;
        this.currentPalace = null;
        this.currentLociIndex = 1;

        this.timer = new Timer();
    }

    async load() {
        this.currentQuiz = await this.loadQuiz();
        this.quizCards = this.currentQuiz["cards"];
        this.currentPalace = await this.loadPalace("default");
        this.renderQuiz();
        this.renderPalace(this.currentPalace);

    }
    async loadQuiz() {
        const response = await fetch("http://localhost:8080/api/v1/quiz");
        if(response.ok) {
            return await response.json();
        }
    }

    async loadPalace(name) {

        const response = await fetch("http://localhost:8080/api/v1/palace/" + name);
        if (response.ok) {
            return await response.json();
        }
    }

    renderQuiz() {

        for (let i = 0; i < this.quizCards.length; i++) {
            let card = this.quizCards[i];
            let paoIndex = card.suit.toLowerCase();
            let paoItem = this.matrix[paoIndex];
            card.pao = paoItem[card.value - 1];
        }

        let persons = this.quizCards.map(x => x.pao.person).sort();
        let actions = this.quizCards.map(x => x.pao.action).sort();
        let objects = this.quizCards.map(x => x.pao.object).sort();
        let cards = this.quizCards.map(x => x.value + " (" + x.name + ") of " + x.suit).sort(this.cardNameSorter);

        this.setQuizSelectOptions(this.quizPerson, persons);
        this.setQuizSelectOptions(this.quizAction, actions);
        this.setQuizSelectOptions(this.quizObject, objects);
        this.setQuizSelectOptions(this.quizCard, cards);
    }

    startQuiz() {
        this.currentQuizIndex = -1;
        this.timer.stopTime();
        this.quiz.style.display = "block";
        this.quizFront.style.display = "none";
        this.nextQuizCard();
        this.timer.startWatch();
        //$.notify("Cool! Lets go.",{position:"bottom right",className:"success"});

    }

    /**
     * Restarts the quiz.
     */
    restartQuiz() {
        this.startQuiz();
    }

    /**
     * Comparator function used for sorting cards.
     * @param a
     * @param b
     * @returns {number|number}
     */
    cardNameSorter(a, b) {
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
    setQuizSelectOptions(elem, values) {
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
    quizPersonChange(select) {
        let selectValue = select.options[select.selectedIndex].value;
        let correctValue = this.quizCards[this.currentQuizIndex].pao.person;

        this.setSelectColor(select, selectValue === correctValue);
        if (this.isAllCorrect()) this.notifyAllCorrect();
    }

    /**
     * Handles a selection in the action select.
     * @param select
     */
    quizActionChange(select) {
        let selectValue = select.options[select.selectedIndex].value;
        let correctValue = this.quizCards[this.currentQuizIndex].pao.action;

        this.setSelectColor(select, selectValue === correctValue);
        if (this.isAllCorrect()) this.notifyAllCorrect();
    }

    /**
     * Handles a selection in the object select.
     * @param select
     */
    quizObjectChange(select) {
        let selectValue = select.options[select.selectedIndex].value;
        let correctValue = this.quizCards[this.currentQuizIndex].pao.object;

        this.setSelectColor(select, selectValue === correctValue);
        if (this.isAllCorrect()) this.notifyAllCorrect();
    }

    /**
     * Handles a selection in the card select.
     * @param select
     */
    quizCardChange(select) {
        let selectValue = select.options[select.selectedIndex].value;
        let correctValue = this.quizCards[this.currentQuizIndex].value + " (" + this.quizCards[this.currentQuizIndex].name + ") of " + this.quizCards[this.currentQuizIndex].suit;

        this.setSelectColor(select, selectValue === correctValue);
        if (this.isAllCorrect()) this.notifyAllCorrect();
    }

    /**
     * Sets a select background color based on if it is a correct value, wrong value or the first neutral entry.
     * @param select
     * @param isCorrect
     */
    setSelectColor(select, isCorrect) {
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
    isAllCorrect() {
        return this.quizPerson.classList.contains("quiz-select-correct") &&
            this.quizAction.classList.contains("quiz-select-correct") &&
            this.quizObject.classList.contains("quiz-select-correct") &&
            this.quizCard.classList.contains("quiz-select-correct");
    }

    /**
     * Notify if all quiz select values are correct.
     */
    notifyAllCorrect() {
        //$.notify("Congratulation! You just completed the " + (currentQuizIndex+1) + " quiz question. Click the next button.",{position:"bottom right",className:"success"});
    }

    /**
     * Navigates to the previous quiz card.
     */
    prevQuizCard() {
        this.clearSelects();
        this.currentQuizIndex = this.currentQuizIndex > 0 ? this.currentQuizIndex - 1: 51;
        this.quizImage.src = this.quizCards[this.currentQuizIndex].pao.image;
        this.autoReveal();
        this.cardCounter.innerHTML = (this.currentQuizIndex + 1).toString();
        this.btnQuizPrev.disabled = isQuizDone();
    }

    /**
     * Navigates to the next quiz card.
     */
    nextQuizCard() {
        this.clearSelects();
        this.currentQuizIndex = this.currentQuizIndex < 51 ? this.currentQuizIndex + 1: 0;
        this.quizImage.src = this.quizCards[this.currentQuizIndex].pao.image;
        this.autoReveal();
        this.cardCounter.innerHTML = (this.currentQuizIndex + 1).toString();
        this.btnQuizNext.disabled = this.isQuizDone();
    }

    /**
     * Returns true if the quiz is done.
     * TODO: Should instead validate that all cards has been answered correctly.
     * @returns {boolean}
     */
    isQuizDone() {
        return this.currentQuizIndex === 51;
    }

    /**
     * Checks to see which selects should be revealed automatically.
     */
    autoReveal() {
        if (this.quizRevealPerson.checked) this.revealPerson();
        if (this.quizRevealAction.checked) this.revealAction();
        if (this.quizRevealObject.checked) this.revealObject();
        if (this.quizRevealCard.checked) this.revealCard();
    }

    /**
     * Toggles checking all the select checkboxes.
     * @param elem
     */
    checkRevealAll(elem) {
        this.quizRevealPerson.checked = elem.checked;
        this.quizRevealAction.checked = elem.checked;
        this.quizRevealObject.checked = elem.checked;
        this.quizRevealCard.checked = elem.checked;
        if (elem.checked) {
            this.autoReveal();
        } else {
            this.clearSelects();
        }
    }

    /**
     * Reveals al the selects.
     */
    revealAll() {
        this.revealPerson();
        this.revealAction();
        this.revealObject();
        this.revealCard();
    }

    /**
     * Handles a single select reveal checkbox.
     * @param elem
     */
    quizCheck(elem) {
        let item = null;
        let reveal = null;

        switch (elem) {
            case this.quizRevealPerson:
                item = this.quizPerson;
                reveal = this.revealPerson;
                break;
            case this.quizRevealAction:
                item = this.quizAction;
                reveal = this.revealAction;
                break;
            case this.quizRevealObject:
                item = this.quizObject;
                reveal = this.revealObject;
                break;
            case this.quizRevealCard:
                item = this.quizCard;
                reveal = this.revealCard;
                break;
        }

        if (elem.checked) {
            reveal();
        } else {
            this.clearSelect(item);
        }
    }

    /**
     * Reveals the person select value.
     */
    revealPerson() {
        let card = this.quizCards[this.currentQuizIndex];
        let correctValue = card.pao.person;
        for (let index = 1; index < this.quizPerson.options.length; index++) {
            if (this.quizPerson.options[index].value === correctValue) {
                this.quizPerson.selectedIndex = index;
                this.setSelectColor(this.quizPerson, true);
                break;
            }
        }
    }

    /**
     * Reveals the action select value.
     */
    revealAction() {
        let card = this.quizCards[this.currentQuizIndex];
        let correctValue = card.pao.action;
        for (let index = 1; index < this.quizPerson.options.length; index++) {
            if (this.quizAction.options[index].value === correctValue) {
                this.quizAction.selectedIndex = index;
                this.setSelectColor(this.quizAction, true);
                break;
            }
        }
    }

    /**
     * Reveals the object select value.
     */
    revealObject() {
        let card = this.quizCards[this.currentQuizIndex];
        let correctValue = card.pao.object;
        for (let index = 1; index < this.quizPerson.options.length; index++) {
            if (this.quizObject.options[index].value === correctValue) {
                this.quizObject.selectedIndex = index;
                this.setSelectColor(this.quizObject, true);
                break;
            }
        }
    }

    /**
     * Reveals the card select value.
     */
    revealCard() {
        let card = this.quizCards[this.currentQuizIndex];
        let correctValue = card.value + " (" + card.name + ") of " + card.suit;
        for (let index = 1; index < this.quizCard.options.length; index++) {
            if (this.quizCard.options[index].value === correctValue) {
                this.quizCard.selectedIndex = index;
                this.setSelectColor(this.quizCard, true);
                break;
            }
        }
    }

    /**
     * Clears/resets all the selects.
     */
    clearSelects() {
        this.clearSelect(this.quizPerson);
        this.clearSelect(this.quizAction);
        this.clearSelect(this.quizObject);
        this.clearSelect(this.quizCard);
    }

    /**
     * Clears/resets a single select.
     * @param elem
     */
    clearSelect(elem) {
        elem.selectedIndex = 0;
        elem.classList.remove("quiz-select-wrong");
        elem.classList.remove("quiz-select-correct");
        elem.classList.add("quiz-select-neutral");
    }

    shuffleDeck() {
        this.shuffle(this.quizCards);
        this.renderPalace(this.currentPalace);
        this.restartQuiz();
    }

    shuffle(deck) {
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

    renderPalace(palace) {

        let palaceLabel = null;
        let palaceInfo = null;
        let palaceImage = null;
        let palaceItem = null;
        let card = null;
        let palacePhrase = null;

        this.currentLociIndex = 1;
        document.getElementById("palace-loci-" + this.currentLociIndex).style.display = "block";

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
            card = this.quizCards[i];

            palaceItem.innerHTML = "<img src='" + this.cardUtil.getSVGCardImageUrl(this.cardUtil.getCardId(card), card.suit) + "' class='card' alt=''>";

            if (i > 0 && (i + 1) % 3 === 0) {
                palacePhrase = document.getElementById("palace-phrase-" + ((i + 1) / 3));
                palacePhrase.innerHTML = this.quizCards[i - 2].pao.person + ", " + this.quizCards[i - 1].pao.action + ", " + this.quizCards[i].pao.object;
            }

            if (i === 51) {
                palacePhrase = document.getElementById("palace-phrase-18");
                palacePhrase.innerHTML = this.quizCards[i].pao.person;
            }

        }
    }

    prevLoci() {
        document.getElementById("palace-loci-" + this.currentLociIndex).style.display = "none";
        this.currentLociIndex = (this.currentLociIndex === 1) ? 18 : this.currentLociIndex - 1;
        document.getElementById("palace-loci-" + this.currentLociIndex).style.display = "block";
    }

    /**
     * Navigates to the next palace loci. If we're currently at the last loci it navigates to the first loci.
     */
    nextLoci() {
        document.getElementById("palace-loci-" + this.currentLociIndex).style.display = "none";
        this.currentLociIndex = (this.currentLociIndex === 18) ? 1 : this.currentLociIndex + 1;

        document.getElementById("palace-loci-" + this.currentLociIndex).style.display = "block";
    }


}