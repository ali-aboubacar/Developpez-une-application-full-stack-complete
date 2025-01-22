package com.openclassrooms.mddapi.dtos;

public class CommentDto {
    private long id;

    private String comment;

    private String userName;

    private long owner_id;
    public long getId() {
        return id;
    }

    public String getComment() {
        return comment;
    }

    public String getUserName() {
        return userName;
    }

    public long getOwner_id() {
        return owner_id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setOwner_id(long owner_id) {
        this.owner_id = owner_id;
    }
}
