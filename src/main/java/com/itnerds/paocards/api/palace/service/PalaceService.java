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
package com.itnerds.paocards.api.palace.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.io.File;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Optional;

@Service
public class PalaceService {

    private final HashMap<String, String> palaces;

    public PalaceService() throws Exception {

        palaces = new HashMap<>();


        final String[] palacePathNames = new String[]{"palace/default.json"};

        for(String palacePathName : palacePathNames) {
            String palace = StreamUtils.copyToString(new ClassPathResource(palacePathName).getInputStream(), Charset.defaultCharset());
            String fileName = new File(palacePathName).getName();
            String name = fileName.substring(0, fileName.lastIndexOf("."));
            palaces.put(name, palace);
        }

    }

    public Optional<String> find(String name) {
        return Optional.ofNullable(palaces.get(name));
    }
}
