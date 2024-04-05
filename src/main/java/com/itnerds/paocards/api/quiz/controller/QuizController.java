package com.itnerds.paocards.api.quiz.controller;

import com.itnerds.paocards.api.quiz.service.QuizService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin // Allow all domain origins.
@RestController
@RequestMapping("api/v1/quiz")
public class QuizController {

    private QuizService service;

    public QuizController(QuizService service) {
        this.service = service;
    }


}
