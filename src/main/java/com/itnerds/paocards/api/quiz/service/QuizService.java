package com.itnerds.paocards.api.quiz.service;

import com.itnerds.paocards.deck.CardDeck;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Services a deck of cards.
 * @see CardDeck
 */
@Service
public class QuizService {

    /**
     * @return a new shuffled deck of cards.
     */
    public Optional<CardDeck> cards() {
        CardDeck deck = new CardDeck();
        deck.shuffle();

        return Optional.of(deck);
    }
}
