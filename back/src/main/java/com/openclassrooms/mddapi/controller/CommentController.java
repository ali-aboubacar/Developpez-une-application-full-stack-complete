package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dtos.CommentDto;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.payload.request.CommentRequest;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CommentController {
    @Autowired
    CommentService commentService;

    @GetMapping("/comments/{id}")
    public ResponseEntity<?> getAllCommentByArticle(@PathVariable long id){
        try {

            List<CommentDto> comments =  commentService.getAllCommentForArticle(id);
            return new ResponseEntity<>(comments, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/comments")
    public ResponseEntity<?> createComment(@RequestBody CommentRequest comment){
        try {
            commentService.createComment(comment);
            return new ResponseEntity<MessageResponse>(new MessageResponse("Comment send with success"), HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
