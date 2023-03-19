package com.utcn.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tag_questions")
public class Tag_Questions {
    @Id
    @Column(name="id")
    private int id;

    @Column(name="question_id")
    private int question_id;

    @Column(name="tag_id")
    private int tag_id;

    public Tag_Questions() {
    }

    public Tag_Questions(int id, int question_id, int tag_id) {
        this.id = id;
        this.question_id = question_id;
        this.tag_id = tag_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(int question_id) {
        this.question_id = question_id;
    }

    public int getTag_id() {
        return tag_id;
    }

    public void setTag_id(int tag_id) {
        this.tag_id = tag_id;
    }
}
