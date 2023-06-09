package com.utcn.demo.controller;

import com.utcn.demo.dto.AnswerDTO;
import com.utcn.demo.entity.Answer;
import com.utcn.demo.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/answers")
@CrossOrigin(origins = "http://localhost:4200")
public class AnswerController {
    @Autowired
    AnswerService answerService;

    @GetMapping("/getAll")
    @ResponseBody
    public List<Answer> retrieveAnswers(){return answerService.retrieveAnswers();}

    @GetMapping("/getById/{id}")
    @ResponseBody
    public AnswerDTO retrieveById(@PathVariable Long id){return answerService.retrieveAnswerById(id);}

    @GetMapping("/GetById")
    @ResponseBody
    public AnswerDTO retrieveById1(@RequestParam("id") Long id){return answerService.retrieveAnswerById(id);}

    @DeleteMapping("/deleteById/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        answerService.deleteById(id);
        return ResponseEntity.ok("{\"message\": \"Success\"}");
    }

    @PostMapping("/insertAnswer")
    @ResponseBody
    public Answer insertAnswer(@RequestBody Answer answer){return answerService.saveAnswer(answer);}

    @PutMapping("/updateAnswer")
    @ResponseBody
    public Answer updateAnswer(@RequestBody Answer answer){
        System.out.println(answer.getContent_id());
        if(answerService.retrieveAnswerById(answer.getContent_id())!=null){
            return answerService.saveAnswer(answer);
        }
        else return null;
    }

}
