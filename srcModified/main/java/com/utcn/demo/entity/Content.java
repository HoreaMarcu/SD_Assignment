package com.utcn.demo.entity;

import jakarta.persistence.*;

import java.util.Date;


@Entity
@Table(name = "content")
@Inheritance(strategy=InheritanceType.JOINED)
public class Content {
    @Id
    @Column(name = "content_id")
    private Long content_id;

    @Column(name = "author_cnp")
    private Long author_cnp;

    @Column(name = "text_content")
    private String text_content;

    @Column(name =  "creation_date_time")
    private Date creation_date_time;

    @Column(name = "picture")
    private String picture;

    @Column(name = "likes")
    private int likes;

    @Column(name = "dislikes")
    private int dislikes;

    public Content() {
    }

    public Content(Long content_id, Long author_cnp, String text_content, Date creation_date_time, String picture, int likes, int dislikes) {
        this.content_id = content_id;
        this.author_cnp = author_cnp;
        this.text_content = text_content;
        this.creation_date_time = creation_date_time;
        this.picture = picture;
        this.likes = likes;
        this.dislikes = dislikes;
    }

    public Long getContent_id() {
        return content_id;
    }

    public void setContent_id(Long content_id) {
        this.content_id = content_id;
    }

    public Long getAuthor_cnp() {
        return author_cnp;
    }

    public void setAuthor_cnp(Long author_cnp) {
        this.author_cnp = author_cnp;
    }

    public String getText_content() {
        return text_content;
    }

    public void setText_content(String text_content) {
        this.text_content = text_content;
    }

    public Date getCreation_date_time() {
        return creation_date_time;
    }

    public void setCreation_date_time(Date creation_date_time) {
        this.creation_date_time = creation_date_time;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public int getDislikes() {
        return dislikes;
    }

    public void setDislikes(int dislikes) {
        this.dislikes = dislikes;
    }
}
