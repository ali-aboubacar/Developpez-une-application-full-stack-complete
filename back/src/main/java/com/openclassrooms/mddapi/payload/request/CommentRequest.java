package com.openclassrooms.mddapi.payload.request;

public class CommentRequest {
    private String comment;
    private Long article_id;

    public String getComment() {
        return comment;
    }
    public void setComment(String comment){
        this.comment = comment;
    }

    public Long getArticle_id() {
        return article_id;
    }

    public void setArticle_id(Long article_id) {
        this.article_id = article_id;
    }

}
