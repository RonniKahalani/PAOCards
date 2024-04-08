package com.itnerds.paocards.api.palace.controller;

import com.itnerds.paocards.advice.ResourceNotFoundException;
import com.itnerds.paocards.api.palace.service.PalaceService;
import com.itnerds.paocards.api.pao.service.PAOService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin // Allow all domain origins.
@RestController
@RequestMapping("api/v1/palace")
public class PalaceController {
    final private PalaceService palaceService;

    public PalaceController(PalaceService palaceService) {
        this.palaceService = palaceService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> find(@PathVariable("id") String id) throws ResourceNotFoundException {
        Optional<String> item = Optional.of(palaceService.find(id)
                .orElseThrow(() -> new ResourceNotFoundException("Palace %s not found.".formatted( id))));
        return ResponseEntity.ok().body(item.get());
    }
}
