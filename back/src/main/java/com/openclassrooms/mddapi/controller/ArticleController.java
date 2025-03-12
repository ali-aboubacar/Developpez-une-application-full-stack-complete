package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dtos.ArticleDto;
import com.openclassrooms.mddapi.exception.ResourceNotFoundException;
import com.openclassrooms.mddapi.jwtUtils.JwtUtils;
import com.openclassrooms.mddapi.model.Article;
import com.openclassrooms.mddapi.payload.response.ArticleResponse;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.service.ArticleService;
import com.openclassrooms.mddapi.service.ThemeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ArticleController {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Autowired
    private ArticleService articleService;

    @Autowired
    private ThemeService themeService;
    @PostMapping("/article")
    public ResponseEntity<MessageResponse> createOneArticle(@RequestParam("title") String title, @RequestParam("theme") String theme, @RequestParam("description") String description){
        Article newArticle = new Article();
        newArticle.setTheme(themeService.giveArticleTheme(theme));
        articleService.createRental(newArticle, title, description);
        return new ResponseEntity<MessageResponse>(new MessageResponse("Article created !"), HttpStatus.CREATED);
    }
    @GetMapping("/article/{id}")
    public ResponseEntity<ArticleDto> getOneArticle(@PathVariable("id") long id){
        Optional<ArticleDto> article = articleService.getRentalById(id);
        return article.map(value -> new ResponseEntity(value, HttpStatus.OK))
                .orElseThrow(() -> new ResourceNotFoundException("Not found article with id" + id));

    }
    @GetMapping("/article")
    public ResponseEntity<List<ArticleDto>> getAllArticles(){
        List<ArticleDto> articlesList = new ArrayList<>();
        articlesList = articleService.getAllArticles();
        return new ResponseEntity<>(articlesList, HttpStatus.OK);
    }

}
