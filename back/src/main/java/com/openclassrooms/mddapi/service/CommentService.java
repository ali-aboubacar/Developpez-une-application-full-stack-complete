package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dtos.CommentDto;
import com.openclassrooms.mddapi.mapper.CommentMapper;
import com.openclassrooms.mddapi.model.Article;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.payload.request.CommentRequest;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.CommentRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;

    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CommentMapper commentMapper;
    public Comment createComment(CommentRequest comment ){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long userId = userDetails.getId();
            Article rental = articleRepository.findById(comment.getArticle_id()).orElseThrow(() -> new RuntimeException("Rental not found"));
            User owner = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            return commentRepository.save(new Comment(
                    comment.getComment(),
                    owner,
                    rental
            ));
        } catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    public List<CommentDto> getAllCommentForArticle(long id){
        try {
            return commentRepository.findAllByArticle_id(id).stream().map(commentMapper::toCommentDto).collect(Collectors.toList());
        } catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
}
