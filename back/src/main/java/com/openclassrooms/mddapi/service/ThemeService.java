package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dtos.ThemeDto;
import com.openclassrooms.mddapi.mapper.ThemeMapper;
import com.openclassrooms.mddapi.model.ETheme;
import com.openclassrooms.mddapi.model.Theme;
import com.openclassrooms.mddapi.repository.ThemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ThemeService {
    @Autowired
    ThemeRepository themeRepository;

    @Autowired
    ThemeMapper themeMapper;

    public Theme giveArticleTheme(String strThemes){
        Theme themes = new Theme();

        if (strThemes == null) {
            Theme articleTheme = themeRepository.findByName(ETheme.THEME_ONE)
                    .orElseThrow(() -> new RuntimeException("Error: Theme is not found."));
            themes = articleTheme;
        } else {
                switch (strThemes) {
                    case "themeThree":
                        Theme themeThree = themeRepository.findByName(ETheme.THEME_THREE)
                                .orElseThrow(() -> new RuntimeException("Error: Theme is not found."));
                        themes = themeThree;

                        break;
                    case "themeTwo":
                        Theme themeTwo = themeRepository.findByName(ETheme.THEME_TWO)
                                .orElseThrow(() -> new RuntimeException("Error: Theme is not found."));
                        themes = themeTwo;

                        break;
                    case "themeFour":
                        Theme themeFour = themeRepository.findByName(ETheme.THEME_FOUR)
                                .orElseThrow(() -> new RuntimeException("Error: Theme is not found."));
                        themes = themeFour;

                        break;
                    default:
                        Theme themeOne = themeRepository.findByName(ETheme.THEME_ONE)
                                .orElseThrow(() -> new RuntimeException("Error: Theme is not found."));
                        themes = themeOne;
                }
        }

        return themes;
    }

    public List<ThemeDto> getThemes(){
        List<Theme> themes = new ArrayList<>();
        themeRepository.findAll().forEach(themes::add);
        List<ThemeDto> themeDtoList = themes.stream().map(themeMapper::toThemeDto).collect(Collectors.toList());
        return themeDtoList;
    }
}
