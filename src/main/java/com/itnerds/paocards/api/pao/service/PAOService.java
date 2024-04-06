package com.itnerds.paocards.api.pao.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Optional;

@Service
public class PAOService {

    private final HashMap<String, String> paoMatrices;

    public PAOService() throws Exception {

        paoMatrices = new HashMap<>();


        final String[] paoPathNames = new String[]{"pao/default.json", "pao/test.json"};

        for(String paoPathName : paoPathNames) {
            String matrix = StreamUtils.copyToString(new ClassPathResource(paoPathName).getInputStream(), Charset.defaultCharset());
            paoMatrices.put("default", matrix);
        }

    }

    public HashMap<String, String> findAll() {
        return paoMatrices;
    }

    public Optional<String> find(String name) {
        return Optional.ofNullable(paoMatrices.get(name));
    }
}
