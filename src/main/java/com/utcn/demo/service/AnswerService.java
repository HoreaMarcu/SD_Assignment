package com.utcn.demo.service;

import com.utcn.demo.dto.AnswerDTO;
import com.utcn.demo.entity.Answer;
import com.utcn.demo.repository.AnswerRepository;
import com.utcn.demo.repository.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnswerService {
    @Autowired
    AnswerRepository answerRepository;

    @Autowired
    ContentRepository contentRepository;

    @Autowired
    ContentService contentService;

    public List<Answer> retrieveAnswers(){
        List<Answer> a = (List<Answer>) answerRepository.findAll();
        for(int i = 0; i < a.size(); i++){
            for(int  j = i + 1; j < a.size(); j++){
                if(a.get(i).getLikes() - a.get(i).getDislikes() < (a.get(j).getLikes() - a.get(j).getDislikes())){
                    Answer aux = a.get(i);
                    a.set(i,a.get(j));
                    a.set(j,aux);
                }
            }
        }
        return a;
    }

    public AnswerDTO retrieveAnswerById(Long id){
        Optional<Answer> answer = answerRepository.findById(id);
        if(answer.isPresent()){
            return new AnswerDTO(id, answer.get().getQuestion_id());
        }
        else return null;
    }

    public String deleteById(Long id){
        try{
            Optional<Answer> answer = answerRepository.findById(id);
            if(answer.isPresent()){
                contentRepository.deleteById(answer.get().getContent_id());
                answerRepository.deleteById(id);
                return "Success";
            }
            else return "Failed";
        }
        catch(Exception e){
            e.printStackTrace();
            return "Failed";
        }
    }

    public Answer saveAnswer(Answer answer){
        contentService.saveContent(answer);
        return answerRepository.save(answer);
    }

}
