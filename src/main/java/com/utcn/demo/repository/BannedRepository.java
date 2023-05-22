package com.utcn.demo.repository;

import com.utcn.demo.entity.Banned;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BannedRepository extends CrudRepository<Banned,Long> {
}
