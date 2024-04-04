package com.itnerds.paocards.deck;

import com.itnerds.paocards.card.Card;
import com.itnerds.paocards.card.CardName;
import com.itnerds.paocards.card.CardSuit;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Getter
@Setter
public class CardDeck {
    List<Card> cards;

    public CardDeck() {
        cards = new ArrayList<>();

        for(CardSuit suit : CardSuit.values()) {
            int index = 0;
            for(CardName name : CardName.values()) {
                cards.add( new Card(suit, name, ++index));
            }
        }
    }

    public void shuffle() {
        Collections.shuffle(cards);
    }

}
