package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findAllByArticle_id(long id);

}
