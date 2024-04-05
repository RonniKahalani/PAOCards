package com.itnerds.paocards.api.pao.controller;

import com.itnerds.paocards.api.pao.service.PAOService;
import com.itnerds.paocards.pao.PAOMatrix;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Optional;

import com.itnerds.paocards.advice.ResourceNotFoundException;

@CrossOrigin // Allow all domain origins.
@RestController
@RequestMapping("api/v1/pao")
public class PAOMatrixController {

    private PAOService service;

    public PAOMatrixController(PAOService service) {
        this.service = service;
    }

    @GetMapping
    ResponseEntity<HashMap<String, PAOMatrix>> findAll() {
        HashMap<String, PAOMatrix> all = service.findAll();
        return ResponseEntity.ok().body(all);
    }

    /**
     * Handles getting/finding a PAO matrix.
     *
     * @param id
     * @return paoMatrix
     * @throws ResourceNotFoundException
     * @see <a href="http://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET">HTTP GET</a>
     */
    @GetMapping("/{id}")
    public ResponseEntity<PAOMatrix> find(@PathVariable("id") String id) throws ResourceNotFoundException {
        Optional<PAOMatrix> item = Optional.of(service.find(id)
                .orElseThrow(() -> new ResourceNotFoundException("PAO matrix %d not found."+ id)));
        return ResponseEntity.ok().body(item.get());
    }

}
