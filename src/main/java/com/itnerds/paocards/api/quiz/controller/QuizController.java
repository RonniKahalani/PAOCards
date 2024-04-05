package com.itnerds.paocards.api.quiz.controller;

import com.itnerds.paocards.advice.ResourceNotFoundException;
import com.itnerds.paocards.api.quiz.service.QuizService;
import com.itnerds.paocards.deck.CardDeck;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin // Allow all domain origins.
@RestController
@RequestMapping("api/v1/quiz")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    /**
     * Handles getting/finding a quiz for a specific PAO matrix.
     *
     * @return cardDeck
     * @see <a href="http://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET">HTTP GET</a>
     */
    @GetMapping()
    public ResponseEntity<CardDeck> cards() throws ResourceNotFoundException {
        Optional<CardDeck> item = Optional.of(quizService.cards()
                .orElseThrow(() -> new ResourceNotFoundException("Quiz cards found.")));
        return ResponseEntity.ok().body(item.get());
    }
}
