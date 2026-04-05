package com.contentflow.backend.controller;

import com.contentflow.backend.model.ContentHistory;
import com.contentflow.backend.repository.ContentHistoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/history")
public class HistoryController {

    private final ContentHistoryRepository historyRepo;

    public HistoryController(ContentHistoryRepository historyRepo) {
        this.historyRepo = historyRepo;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<ContentHistory>> getUserHistory(@PathVariable String userId) {
        List<ContentHistory> history = historyRepo.findByUserId(userId);
        return ResponseEntity.ok(history);
    }
}
