package com.itnerds.paocards.pao;

import com.itnerds.paocards.card.Card;
import com.itnerds.paocards.card.CardSuit;
import com.itnerds.paocards.deck.CardDeck;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter

public class PAOMatrix {
    public List<PAOItem> hearts;
    public List<PAOItem> clubs;
    public List<PAOItem> diamonds;
    public List<PAOItem> spades;

    public PAOMatrix(List<PAOItem> hearts, List<PAOItem> clubs, List<PAOItem> diamonds, List<PAOItem> spades) {
        this.hearts = hearts;
        this.clubs = clubs;
        this.diamonds = diamonds;
        this.spades = spades;
    }
}
