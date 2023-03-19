package com.utcn.demo.dto;

public class AnswerDTO {
    private Long id;
    private Long questionId;

    public AnswerDTO(Long id, Long questionId) {
        this.id = id;
        this.questionId = questionId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }
}
