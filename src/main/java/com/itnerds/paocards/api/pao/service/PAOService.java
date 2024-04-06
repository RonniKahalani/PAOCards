package com.itnerds.paocards.api.pao.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.io.File;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Optional;

@Service
public class PAOService {

    private final HashMap<String, String> paoMatrices;

    public PAOService() throws Exception {

        paoMatrices = new HashMap<>();


        final String[] paoPathNames = new String[]{"pao/default.json"};

        for(String paoPathName : paoPathNames) {
            String paoMatrix = StreamUtils.copyToString(new ClassPathResource(paoPathName).getInputStream(), Charset.defaultCharset());
            String fileName = new File(paoPathName).getName();
            String name = fileName.substring(0, fileName.lastIndexOf("."));
            paoMatrices.put(name, paoMatrix);
        }

    }

    public Optional<String> find(String name) {
        return Optional.ofNullable(paoMatrices.get(name));
    }
}
