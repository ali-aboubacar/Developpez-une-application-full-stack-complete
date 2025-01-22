package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dtos.CommentDto;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommentMapper {
    @Autowired
    UserService userService;
    public CommentDto toCommentDto(Comment comment){
        if (comment == null){
            return null;
        }

        CommentDto commentDto = new CommentDto();
        commentDto.setId(comment.getId());
        commentDto.setComment(comment.getComment());
        commentDto.setUserName(comment.getUser().getName());
        commentDto.setOwner_id(comment.getUser().getId());
        return commentDto;
    }

    public Comment toComment(CommentDto commentDto){
        if (commentDto == null){
            return null;
        }
        User owner = userService.getUserById(commentDto.getOwner_id()).orElseThrow(() -> new RuntimeException("User not found"));
        Comment comment = new Comment();
        comment.setId(commentDto.getId());
        comment.setComment(commentDto.getComment());
        comment.setUser(owner);
        return comment;
    }
}
