package com.utcn.demo.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "question")
public class Question extends Content{

    @Column(name = "title")
    private String title;

    public Question() {
    }

    public Question(Long content_id, Long author_cnp, String text_content, Date creation_date_time, String picture, int likes, int dislikes, String title) {
        super(content_id, author_cnp, text_content, creation_date_time, picture, likes, dislikes);
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
