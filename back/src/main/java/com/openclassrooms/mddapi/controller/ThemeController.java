package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dtos.ThemeDto;
import com.openclassrooms.mddapi.jwtUtils.JwtUtils;
import com.openclassrooms.mddapi.service.ThemeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ThemeController {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Autowired
    ThemeService themeService;

    @GetMapping("/themes")
    public ResponseEntity<List<ThemeDto>> getAllThemes(){
        try{
            return new ResponseEntity<>(themeService.getThemes(), HttpStatus.OK);
        } catch (RuntimeException e){
            logger.error("Error getting all themes", e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }
}
