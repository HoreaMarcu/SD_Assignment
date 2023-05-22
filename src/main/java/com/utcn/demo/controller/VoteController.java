package com.utcn.demo.controller;

import com.utcn.demo.entity.Vote;
import com.utcn.demo.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( "/votes")
@CrossOrigin(origins = "http://localhost:4200")
public class VoteController {
    @Autowired
    VoteService voteService;
    @GetMapping( "/getAll")
    @ResponseBody
    public List<Vote> retrieveVotes() {
        return voteService.retrieveVotes();
    }


    @PostMapping("/insertVote")
    @ResponseBody
    public Vote insertVote(@RequestBody Vote vote){
        return voteService.saveVote(vote);
    }


    @DeleteMapping("/deleteById/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        voteService.deleteById(id);
        return ResponseEntity.ok("{\"message\": \"Success\"}");
    }

}
