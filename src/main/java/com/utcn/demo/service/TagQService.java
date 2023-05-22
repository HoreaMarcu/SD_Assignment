package com.utcn.demo.service;

import com.utcn.demo.entity.Tag_Questions;
import com.utcn.demo.entity.Vote;
import com.utcn.demo.repository.TagQRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagQService {

    @Autowired
    TagQRepository tagQRepository;

    public List<Tag_Questions> retrieveTagQ(){return (List<Tag_Questions>) tagQRepository.findAll();}

    public Tag_Questions saveVote(Tag_Questions tagQuestions){
        return tagQRepository.save(tagQuestions);
    }

    public String deleteById(Long id){
        try{
            tagQRepository.deleteById(id);
            return "Success";
        }
        catch (Exception e){
            e.printStackTrace();
            return "Failed";
        }
    }
}
