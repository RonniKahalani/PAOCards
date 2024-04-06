package com.itnerds.paocards.deck;

import com.itnerds.paocards.card.Card;
import com.itnerds.paocards.card.CardName;
import com.itnerds.paocards.card.CardSuit;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Generates a deck of cards, with no jokers.
 */
@Getter
@Setter
public class CardDeck {
    private List<Card> cards;

    /**
     * Initializes a new card deck.
     */
    public CardDeck() {
        cards = new ArrayList<>();

        for(CardSuit suit : CardSuit.values()) {
            int value = 0;
            for(CardName name : CardName.values()) {
                cards.add( new Card(suit, name, ++value));
            }
        }
    }

    /**
     * Shuffles the cards in the deck in random order.
     */
    public void shuffle() {
        Collections.shuffle(cards);
    }

}
