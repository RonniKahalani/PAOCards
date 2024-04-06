package com.itnerds.paocards.api.quiz.controller;

import com.itnerds.paocards.advice.ResourceNotFoundException;
import com.itnerds.paocards.api.quiz.service.QuizService;
import com.itnerds.paocards.deck.CardDeck;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * Controls endpoint to get a shuffled deck of cards.
 * @see CardDeck
 */
@CrossOrigin // Allow all domain origins.
@RestController
@RequestMapping("api/v1/quiz")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping()
    public ResponseEntity<CardDeck> cards() throws ResourceNotFoundException {
        Optional<CardDeck> item = Optional.of(quizService.cards()
                .orElseThrow(() -> new ResourceNotFoundException("Quiz cards not found.")));
        return ResponseEntity.ok().body(item.get());
    }
}
