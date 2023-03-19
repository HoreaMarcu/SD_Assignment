package com.utcn.demo.controller;

import com.utcn.demo.dto.QuestionDTO;
import com.utcn.demo.dto.UserDTO;
import com.utcn.demo.entity.Question;
import com.utcn.demo.entity.User;
import com.utcn.demo.service.QuestionService;
import com.utcn.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( "/questions")
public class QuestionController {

    @Autowired
    QuestionService questionService;
    @GetMapping("/getAll")
    @ResponseBody
    public List<Question> retrieveQuestions(){return questionService.retrieveQuestions();}

    @GetMapping("/getById/{id}")
    @ResponseBody
    public QuestionDTO retrieveById(@PathVariable Long id){return questionService.retrieveQuestionById(id);}


    @GetMapping("/getById")
    @ResponseBody
    public QuestionDTO retrieveById1(@RequestParam("id") Long id){return questionService.retrieveQuestionById(id);}

    @DeleteMapping("/deleteById/{id}")
    @ResponseBody
    public String deleteById(@PathVariable Long id) {return questionService.deleteById(id);}

    @PostMapping("/insertQuestion")
    @ResponseBody
    public Question insertQuestion(@RequestBody Question question) {return questionService.saveQuestion(question);}

    @PutMapping("/updateQuestion")
    @ResponseBody
    public Question updateQuestion(@RequestBody Question question){
        if(questionService.retrieveQuestionById(question.getContent_id()) !=null){
            return  questionService.saveQuestion(question);
        }
        else return null;
    }
}
