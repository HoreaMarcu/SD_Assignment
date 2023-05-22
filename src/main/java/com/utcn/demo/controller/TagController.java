package com.utcn.demo.controller;

import com.utcn.demo.entity.Tag;
import com.utcn.demo.entity.Vote;
import com.utcn.demo.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( "/tags")
@CrossOrigin(origins = "http://localhost:4200")
public class TagController {
    @Autowired
    TagService tagService;

    @GetMapping( "/getAll")
    @ResponseBody
    public List<Tag> retrieveTags() {
        return tagService.retrieveTags();
    }


    @PostMapping("/insertTag")
    @ResponseBody
    public Tag insertTag(@RequestBody Tag tag){
        return tagService.saveTag(tag);
    }

}
