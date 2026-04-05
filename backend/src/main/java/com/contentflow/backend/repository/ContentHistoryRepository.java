package com.contentflow.backend.repository;

import com.contentflow.backend.model.ContentHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ContentHistoryRepository extends MongoRepository<ContentHistory, String> {
    List<ContentHistory> findByUserId(String userId);
}
