package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CommentController {
    @Autowired
    CommentService commentService;

    @GetMapping("/comments")
    public ResponseEntity<?> getAllCommentByArticle(){
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/comments")
    public ResponseEntity<?> createComment(){
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
