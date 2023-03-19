package com.utcn.demo.entity;

import jakarta.persistence.*;
@Entity
@Table(name = "vote")
public class Vote {

    @Id
    @Column(name="id")
    private int id;

    @Column(name="user_id")
    private int user_id;

    @Column(name="content_id")
    private int content_id;

    public Vote() {
    }

    public Vote(int id, int user_id, int content_id) {
        this.id = id;
        this.user_id = user_id;
        this.content_id = content_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getContent_id() {
        return content_id;
    }

    public void setContent_id(int content_id) {
        this.content_id = content_id;
    }
}
