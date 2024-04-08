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
