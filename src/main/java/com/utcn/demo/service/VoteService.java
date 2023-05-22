package com.utcn.demo.service;

import com.utcn.demo.entity.Answer;
import com.utcn.demo.entity.Vote;
import com.utcn.demo.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoteService {

    @Autowired
    VoteRepository voteRepository;
    public List<Vote> retrieveVotes(){return (List<Vote>) voteRepository.findAll();}

    public Vote saveVote(Vote vote){
        return voteRepository.save(vote);
    }
    public String deleteById(Long id){
        try{
            voteRepository.deleteById(id);
            return "Success";
        }
        catch (Exception e){
            e.printStackTrace();
            return "Failed";
        }
    }
}
