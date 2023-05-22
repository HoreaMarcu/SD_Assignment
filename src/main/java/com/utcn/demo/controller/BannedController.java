package com.utcn.demo.controller;

import com.utcn.demo.EmailSenderService;
import com.utcn.demo.dto.UserDTO;
import com.utcn.demo.entity.Banned;
import com.utcn.demo.entity.User;
import com.utcn.demo.entity.Vote;
import com.utcn.demo.service.BannedService;
import com.utcn.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( "/banned")
@CrossOrigin(origins = "http://localhost:4200")
public class BannedController {
    @Autowired
    BannedService bannedService;

    @Autowired
    EmailSenderService emailSenderService;

    @Autowired
    UserService userService;

    @GetMapping( "/getAll")
    @ResponseBody
    public List<Banned> retrieveBanned() {
        return bannedService.retrieveBanned();
    }

    @PostMapping("/insertBanned")
    @ResponseBody
    public Banned insertVote(@RequestBody Banned banned){
        Long actualId = (long) banned.getUser_id();
        UserDTO user = userService.retrieveUserById(actualId);
        emailSenderService.sendEmail(user.getEmail(), "BANNED FROM STACKOVERFLOW", "YOU HAVE BEEN BANNED");
        return bannedService.saveBanned(banned);
    }

    @DeleteMapping("/deleteById/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        bannedService.deleteById(id);
        return ResponseEntity.ok("{\"message\": \"Success\"}");
    }


}
