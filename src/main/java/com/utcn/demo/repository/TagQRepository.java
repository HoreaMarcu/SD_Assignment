package com.utcn.demo.repository;

import com.utcn.demo.entity.Tag_Questions;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagQRepository extends CrudRepository<Tag_Questions,Long> {
}
