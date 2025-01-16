package com.openclassrooms.mddapi.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "articles")
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User owner;
    @OneToMany(mappedBy = "id")
    private Set<Comment> comment = new HashSet<>();
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private String createdAt;

    @CreationTimestamp
    @Column(name = "updated_at")
    private String updatedAt;

    public Article(){}

    public Article(String title, String description, User user){
        this.title = title;
        this.description = description;
        this.owner = user;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public User getOwner() {
        return owner;
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

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
