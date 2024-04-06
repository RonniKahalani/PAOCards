package com.itnerds.paocards.api.pao.controller;

import com.itnerds.paocards.advice.ResourceNotFoundException;
import com.itnerds.paocards.api.pao.service.PAOService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Optional;

@CrossOrigin // Allow all domain origins.
@RestController
@RequestMapping("api/v1/pao")
public class PAOMatrixController {

    final private PAOService paoService;

    public PAOMatrixController(PAOService paoService) {
        this.paoService = paoService;
    }

    @GetMapping
    ResponseEntity<HashMap<String, String>> findAll() {
        HashMap<String, String> all = paoService.findAll();
        return ResponseEntity.ok().body(all);
    }


    @GetMapping("/{id}")
    public ResponseEntity<String> find(@PathVariable("id") String id) throws ResourceNotFoundException {
        Optional<String> item = Optional.of(paoService.find(id)
                .orElseThrow(() -> new ResourceNotFoundException("PAO matrix %s not found.".formatted( id))));
        return ResponseEntity.ok().body(item.get());
    }
}
