"use strict";

export class CardUtil {

    getSVGCardImageUrl(cardId, suit) {
        return "svg/cards/" + cardId.toLowerCase() + "_of_" + suit.toLowerCase() + ".svg";
    }

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