package com.utcn.demo.repository;

import com.utcn.demo.entity.Vote;
import org.springframework.data.repository.CrudRepository;

public interface VoteRepository extends CrudRepository<Vote,Long> {
}
