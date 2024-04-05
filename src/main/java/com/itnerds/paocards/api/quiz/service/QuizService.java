package com.itnerds.paocards.api.quiz.service;

import com.itnerds.paocards.deck.CardDeck;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuizService {

    public Optional<CardDeck> cards() {
        CardDeck deck = new CardDeck();
        deck.shuffle();

        return Optional.of(deck);
    }
}
