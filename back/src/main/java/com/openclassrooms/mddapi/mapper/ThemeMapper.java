package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dtos.ThemeDto;
import com.openclassrooms.mddapi.model.Theme;
import org.springframework.stereotype.Component;

@Component
public class ThemeMapper {

    public ThemeDto toThemeDto(Theme theme){
        if (theme == null){
            return null;
        }

        ThemeDto themeDto = new ThemeDto();

        themeDto.setId(theme.getId());
        themeDto.setName(theme.getName());
        themeDto.setDescription(theme.getDescription());

        return themeDto;
    }
}
