package com.openclassrooms.mddapi.dtos;

import com.openclassrooms.mddapi.model.ETheme;

public class ThemeDto {
    private long id;

    private ETheme name;

    private String description;

    public void setId(long id) {
        this.id = id;
    }

    public void setName(ETheme name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public long getId() {
        return id;
    }

    public ETheme getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}
