package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dtos.ArticleDto;
import com.openclassrooms.mddapi.model.Article;
import com.openclassrooms.mddapi.payload.response.ArticleResponse;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.service.ArticleService;
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
    @Autowired
    ArticleService articleService;

    @PostMapping("/article")
    public ResponseEntity<?> createOneArticle(@RequestParam("title") String title, @RequestParam("description") String description ){
        try {
            articleService.createRental(title, description);
            return new ResponseEntity<MessageResponse>(new MessageResponse("Article created !"), HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/article/{id}")
    public ResponseEntity<ArticleDto> getOneArticle(@PathVariable("id") long id){
        try {
            Optional<ArticleDto> article = articleService.getRentalById(id);
            return article.map(value -> new ResponseEntity(value, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/article")
    public ResponseEntity<List<ArticleDto>> getAllArticles(){
        try {
            List<ArticleDto> articlesList = new ArrayList<>();
            articlesList = articleService.getAllArticles();
//            ArticleResponse articles = new ArticleResponse();
            return new ResponseEntity<>(articlesList, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
