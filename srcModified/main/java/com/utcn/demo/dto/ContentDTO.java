package com.utcn.demo.dto;


public class ContentDTO {
    private Long id;
    private Long author_cnp;

    public ContentDTO(Long id, Long author_cnp) {
        this.id = id;
        this.author_cnp = author_cnp;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAuthor_cnp() {
        return author_cnp;
    }

    public void setAuthor_cnp(Long author_cnp) {
        this.author_cnp = author_cnp;
    }
}
