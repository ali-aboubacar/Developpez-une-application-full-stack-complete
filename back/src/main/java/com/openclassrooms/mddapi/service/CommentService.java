package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;
}
