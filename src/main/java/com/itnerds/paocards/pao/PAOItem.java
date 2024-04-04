package com.itnerds.paocards.pao;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PAOItem {
    public String name;
    public String action;
    public String object;
    public String image;

    public PAOItem(String name, String action, String object, String imageUrl) {
        this.name = name;
        this.action = action;
        this.object = object;
        this.image = imageUrl;
    }
}
