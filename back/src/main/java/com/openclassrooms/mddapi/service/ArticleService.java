package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dtos.ArticleDto;
import com.openclassrooms.mddapi.mapper.ArticleMapper;
import com.openclassrooms.mddapi.model.Article;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ArticleService {
    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    ArticleMapper articleMapper;

    @Autowired
    UserRepository userRepository;
    /**
     * Recuperation de tous les articles.
     * @return
     */
    public List<ArticleDto> getAllArticles(){
        List<Article> articles = new ArrayList<>();
        articleRepository.findAll().forEach(articles::add);
        List<ArticleDto> articleDtoList = articles.stream().map(articleMapper::toArticleDto).collect(Collectors.toList());

        return articleDtoList;
    }

    /**
     * Recuperation d'un article.
     * @param id l'id du article a recuperer
     * @return un article.
     */
    public Optional<ArticleDto> getRentalById(long id){
        Optional<Article> foundArticle = articleRepository.findById(id);
        return foundArticle.map(articleMapper::toArticleDto);
    }

    /**
     * Creation de l'article dans le systeme
     * @param title titre de l'article
     * @param description description saisie par l'utilisateur
     * @return un article
     */
    public ArticleDto createRental(Article newArticle, String title, String description) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long userId = userDetails.getId();
            User owner = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            newArticle.setTitle(title);
            newArticle.setOwner(owner);
            newArticle.setDescription(description);
            Article savedRental = articleRepository.save(newArticle);
            return articleMapper.toArticleDto(savedRental);
        } catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
}
