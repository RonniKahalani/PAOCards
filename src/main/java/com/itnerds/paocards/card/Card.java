package com.itnerds.paocards.card;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Card {
    CardSuit suit;
    CardName name;
    int value;

    public Card(CardSuit suit, CardName name, int value) {
        this.suit = suit;
        this.name = name;
        this.value = value;
    }

    @Override
    public String toString() {
        return "Card{" +
                "suit=" + suit +
                ", name=" + name +
                ", value=" + value +
                '}';
    }
}
