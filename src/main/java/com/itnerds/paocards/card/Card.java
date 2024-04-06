package com.itnerds.paocards.card;

import lombok.Getter;
import lombok.Setter;

/**
 * Represents a playing card.
 */
@Setter
@Getter
public class Card {
    CardSuit suit;
    CardName name;
    int value;

    /**
     * Initializes a new card.
     * @param suit  a card suit
     * @param name  a name
     * @param value a numeric value
     * @see Card
     */
    public Card(CardSuit suit, CardName name, int value) {
        this.suit = suit;
        this.name = name;
        this.value = value;
    }

    /**
     * {}@{@inheritDoc}
     */
    @Override
    public String toString() {
        return "Card{" +
                "suit=" + suit +
                ", name=" + name +
                ", value=" + value +
                '}';
    }
}
