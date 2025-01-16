package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dtos.ArticleDto;
import com.openclassrooms.mddapi.model.Article;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ArticleMapper {
    @Autowired
    UserService userService;

    public ArticleDto toArticleDto(Article article){
        if (article == null){
            return null;
        }

        ArticleDto articleDto = new ArticleDto();

        articleDto.setId(article.getId());
        articleDto.setTitle(article.getTitle());
        articleDto.setDescription(article.getDescription());
        articleDto.setCreated_at(article.getCreatedAt());
        articleDto.setUpdated_at(article.getUpdatedAt());
        articleDto.setOwner_id(article.getOwner().getId());

        return articleDto;
    }

    public Article toArticle(ArticleDto articleDto){
        if (articleDto == null) {
            return null;
        }

        User owner = userService.getUserById(articleDto.getOwner_id()).orElseThrow(() -> new RuntimeException("User not found"));

        Article article = new Article();

        article.setId(articleDto.getId());
        article.setTitle(articleDto.getTitle());
        article.setDescription(articleDto.getDescription());
        article.setCreatedAt(articleDto.getCreated_at());
        article.setUpdatedAt(articleDto.getUpdated_at());
        article.setOwner(owner);

        return article;
    }
}
