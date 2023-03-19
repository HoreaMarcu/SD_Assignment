package com.utcn.demo.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "answer")
public class Answer extends Content{

    @Column(name ="question_id")
    private Long question_id;

    public Answer() {
    }

    public Answer(Long content_id, Long author_cnp, String text_content, Date creation_date_time, String picture, int likes, int dislikes, Long id, Long question_id) {
        super(content_id, author_cnp, text_content, creation_date_time, picture, likes, dislikes);
        this.question_id = question_id;
    }
    public Long getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(Long question_id) {
        this.question_id = question_id;
    }

}
