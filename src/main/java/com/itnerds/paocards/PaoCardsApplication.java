package com.itnerds.paocards;

import com.itnerds.paocards.card.Card;
import com.itnerds.paocards.deck.CardDeck;
import com.itnerds.paocards.pao.PAOItem;
import com.itnerds.paocards.pao.PAOMatrix;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class PaoCardsApplication {

    public static void main(String[] args) {

        SpringApplication.run(PaoCardsApplication.class, args);
        CardDeck deck = new CardDeck();

        deck.shuffle();
        for (Card card: deck.getCards()) {
            System.out.println(card);
        }



    }

}
