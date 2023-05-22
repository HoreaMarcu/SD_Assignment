package com.utcn.demo.service;

import com.utcn.demo.dto.QuestionDTO;
import com.utcn.demo.dto.UserDTO;
import com.utcn.demo.entity.Content;
import com.utcn.demo.entity.Question;
import com.utcn.demo.entity.User;
import com.utcn.demo.repository.ContentRepository;
import com.utcn.demo.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    ContentRepository contentRepository;

    @Autowired
    ContentService contentService;
    public List<Question> retrieveQuestions(){return (List<Question>) questionRepository.findAll();}

    public QuestionDTO retrieveQuestionById(Long id){
        Optional<Question> question = questionRepository.findById(id);

        if(question.isPresent()){
            return new QuestionDTO(question.get().getTitle());
        }else {
            return null;
        }
    }

    public String deleteById(Long id){
        try{
            Optional<Question> question = questionRepository.findById(id);
            if(question.isPresent()) {
                contentRepository.deleteById(question.get().getContent_id());
                questionRepository.deleteById(id);
                return "Success";
            }
            else return "Failed";
        }
        catch (Exception e){
            e.printStackTrace();
            return "Failed";
        }
    }

    public Question saveQuestion(Question question){
        System.out.println(question.getContent_id() + " " + question.getTitle() + question.getText_content());
        contentService.saveContent(question);
        return questionRepository.save(question);
    }

}
