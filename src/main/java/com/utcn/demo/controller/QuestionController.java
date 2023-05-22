package com.utcn.demo.controller;

import com.utcn.demo.dto.QuestionDTO;
import com.utcn.demo.dto.UserDTO;
import com.utcn.demo.entity.Question;
import com.utcn.demo.entity.User;
import com.utcn.demo.service.QuestionService;
import com.utcn.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true",
//        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE},
//        allowedHeaders = {"x-requested-with", "origin", "content-type", "accept"})
@RequestMapping( "/questions")
//@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true", allowedHeaders = "*")
@CrossOrigin(origins = "http://localhost:4200")

public class QuestionController {

    @Autowired
    QuestionService questionService;

    @GetMapping("/getAll")
    public List<Question> retrieveQuestions(){
        return questionService.retrieveQuestions();
    }

    @GetMapping("/getById/{id}")
    public QuestionDTO retrieveById(@PathVariable Long id){
        return questionService.retrieveQuestionById(id);
    }

    @GetMapping("/getById")
    public QuestionDTO retrieveById1(@RequestParam("id") Long id){
        return questionService.retrieveQuestionById(id);
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        questionService.deleteById(id);
        return ResponseEntity.ok("{\"message\": \"Success\"}");
    }

    @PostMapping("/insertQuestion")
    public Question insertQuestion(@RequestBody Question question) {
        return questionService.saveQuestion(question);
    }

    @PutMapping("/updateQuestion")
    public Question updateQuestion(@RequestBody Question question){
        if(questionService.retrieveQuestionById(question.getContent_id()) !=null){
            return  questionService.saveQuestion(question);
        } else {
            return null;
        }
    }
}
