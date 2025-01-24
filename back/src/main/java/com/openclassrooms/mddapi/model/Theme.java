package com.openclassrooms.mddapi.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "themes")
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ETheme name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "theme", cascade = CascadeType.ALL)
    private List<Article> articles = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "user_theme", joinColumns = @JoinColumn(name = "theme_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> users = new ArrayList<>();

    public Theme(){}
    public Integer getId() {
        return id;
    }

    public ETheme getName() {
        return name;
    }

    public List<Article> getArticles() {
        return articles;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(ETheme name) {
        this.name = name;
    }

    public void setArticles(List<Article> articles) {
        this.articles = articles;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
