package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dtos.CommentDto;
import com.openclassrooms.mddapi.jwtUtils.JwtUtils;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.payload.request.CommentRequest;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.service.CommentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CommentController {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Autowired
    CommentService commentService;

    @GetMapping("/comments/{id}")
    public ResponseEntity<Page<CommentDto>> getAllCommentByArticle(@PathVariable long id, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size){
            Page<CommentDto> comments =  commentService.getAllCommentForArticle(id, page, size);
            return new ResponseEntity<>(comments, HttpStatus.OK);
    }
    @PostMapping("/comments")
    public ResponseEntity<MessageResponse> createComment(@RequestBody CommentRequest comment){
            commentService.createComment(comment);
            return new ResponseEntity<MessageResponse>(new MessageResponse("Comment send with success"), HttpStatus.CREATED);
    }
}
