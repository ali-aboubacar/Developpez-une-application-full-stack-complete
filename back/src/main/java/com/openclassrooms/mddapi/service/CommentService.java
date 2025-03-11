package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dtos.CommentDto;
import com.openclassrooms.mddapi.exception.ResourceNotFoundException;
import com.openclassrooms.mddapi.mapper.CommentMapper;
import com.openclassrooms.mddapi.model.Article;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.payload.request.CommentRequest;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.CommentRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
            Article rental = articleRepository.findById(comment.getArticle_id()).orElseThrow(() -> new ResourceNotFoundException("Article not found" + comment.getArticle_id()));
            User owner = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
            return commentRepository.save(new Comment(
                    comment.getComment(),
                    owner,
                    rental
            ));
        } catch (RuntimeException e){
            throw new RuntimeException(e.getMessage());
        }
    }

    public Page<CommentDto> getAllCommentForArticle(long id, int page, int size){
        try {
            Pageable pageable = PageRequest.of(page,size);
            return commentRepository.findAllByArticle_id(id, pageable).map(commentMapper::toCommentDto);
        } catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
}
