package com.utcn.demo.controller;

import com.utcn.demo.entity.Tag_Questions;
import com.utcn.demo.entity.Vote;
import com.utcn.demo.service.TagQService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( "/tagQ")
@CrossOrigin(origins = "http://localhost:4200")
public class TagQController {
    @Autowired
    TagQService tagQService;

    @GetMapping( "/getAll")
    @ResponseBody
    public List<Tag_Questions> retrieveTagQ() {
        return tagQService.retrieveTagQ();
    }


    @PostMapping("/insertTagQ")
    @ResponseBody
    public Tag_Questions insertTagQ(@RequestBody Tag_Questions tagQuestions){
        return tagQService.saveVote(tagQuestions);
    }
    @DeleteMapping("/deleteById/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        tagQService.deleteById(id);
        return ResponseEntity.ok("{\"message\": \"Success\"}");
    }



}
