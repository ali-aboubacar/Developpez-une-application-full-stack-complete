package com.openclassrooms.mddapi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "comment")
    private String comment;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;

    public Comment(){

    }

    public Comment(String comment, User user, Article article){
        this.comment = comment;
        this.user = user;
        this.article = article;

    }
}
