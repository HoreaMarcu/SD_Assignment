package com.utcn.demo.service;


import com.utcn.demo.entity.Tag;
import com.utcn.demo.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {

    @Autowired
    TagRepository tagRepository;

    public List<Tag> retrieveTags(){return (List<Tag>) tagRepository.findAll();}
    public Tag saveTag(Tag tag){return tagRepository.save(tag);}

    public String deleteById(Long id){
        try{
            tagRepository.deleteById(id);
            return "Success";
        }
        catch (Exception e){
            e.printStackTrace();
            return "Failed";
        }
    }
}
