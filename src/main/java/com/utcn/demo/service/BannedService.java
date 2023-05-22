package com.utcn.demo.service;

import com.utcn.demo.entity.Banned;
import com.utcn.demo.entity.Vote;
import com.utcn.demo.repository.BannedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BannedService {

    @Autowired
    BannedRepository bannedRepository;

    public List<Banned> retrieveBanned(){return (List<Banned>) bannedRepository.findAll();}

    public Banned saveBanned(Banned banned){
        return bannedRepository.save(banned);
    }

    public String deleteById(Long id){
        try{
            bannedRepository.deleteById(id);
            return "Success";
        }
        catch (Exception e){
            e.printStackTrace();
            return "Failed";
        }
    }




}
