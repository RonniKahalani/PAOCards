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
