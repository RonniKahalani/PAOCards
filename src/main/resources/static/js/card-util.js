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
 * Card utility class.
 */
export class CardUtil {

    /**
     * Returns a card image in SVG format.
     * @param cardId
     * @param suit
     * @returns {string}
     */
    getSVGCardImageUrl(cardId, suit) {
        return "svg/cards/" + cardId.toLowerCase() + "_of_" + suit.toLowerCase() + ".svg";
    }

    /**
     * Returns a textual id for a given card. Ex. Ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen or King.
     * @param card
     * @returns {*|string}
     */
    getCardId(card) {
        let value = card.value;
        switch (true) {
            case (value > 1 && value < 11):
                return value + "";
            default:
                return card.name;
        }
    }
}