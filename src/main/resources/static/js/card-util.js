"use strict";

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