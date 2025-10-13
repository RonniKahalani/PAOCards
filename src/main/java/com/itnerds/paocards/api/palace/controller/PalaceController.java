/*
Copyright (c) 2025 Ronni Kahalani

X: https://x.com/RonniKahalani
Website: https://learningisliving.dk
LinkedIn: https://www.linkedin.com/in/kahalani/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
package com.itnerds.paocards.api.palace.controller;

import com.itnerds.paocards.advice.ResourceNotFoundException;
import com.itnerds.paocards.api.palace.service.PalaceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * Controller for managing palaces.
 */
@CrossOrigin // Allow all domain origins.
@RestController
@RequestMapping("api/v1/palace")
public class PalaceController {

    final private PalaceService palaceService;

    /**
     * Constructor
     * @param palaceService handling the palace logic.
     */
    public PalaceController(PalaceService palaceService) {
        this.palaceService = palaceService;
    }

    /**
     * Returns a palace by id.
     * @param id the palace id.
     * @return the palace.
     * @throws ResourceNotFoundException if the palace is not found.
     */
    @GetMapping("/{id}")
    public ResponseEntity<String> find(@PathVariable("id") String id) throws ResourceNotFoundException {
        Optional<String> item = Optional.of(palaceService.find(id)
                .orElseThrow(() -> new ResourceNotFoundException("Palace %s not found.".formatted( id))));
        return ResponseEntity.ok().body(item.get());
    }
}
