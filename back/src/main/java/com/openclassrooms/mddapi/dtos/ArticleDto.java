package com.openclassrooms.mddapi.dtos;

import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.ETheme;

import java.util.List;
import java.util.Set;

public class ArticleDto {
    private long id;
    private String title;
    private String description;
    private String created_at;
    private String updated_at;
    private ETheme theme;
    private Set<CommentDto> comments;
    private long owner_id;
    private String userName;

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public long getOwner_id() {
        return owner_id;
    }

    public String getUserName() {
        return userName;
    }

    public Set<CommentDto> getComments() {
        return comments;
    }

    public String getCreated_at() {
        return created_at;
    }

    public String getUpdated_at() {
        return updated_at;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setOwner_id(long owner_id) {
        this.owner_id = owner_id;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setTheme(ETheme theme) {
        this.theme = theme;
    }

    public ETheme getTheme() {
        return theme;
    }

    public void setComments(Set<CommentDto> comments) {
        this.comments = comments;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }

    public void setUpdated_at(String updated_at) {
        this.updated_at = updated_at;
    }
}
