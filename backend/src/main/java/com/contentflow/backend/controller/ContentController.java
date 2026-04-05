package com.contentflow.backend.controller;

import com.contentflow.backend.service.AIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/content")
public class ContentController {

    private final AIService aiService;
    private final com.contentflow.backend.repository.ContentHistoryRepository historyRepo;

    public ContentController(AIService aiService, com.contentflow.backend.repository.ContentHistoryRepository historyRepo) {
        this.aiService = aiService;
        this.historyRepo = historyRepo;
    }

    @PostMapping("/transform")
    public ResponseEntity<Map<String, Object>> transformContent(@RequestBody Map<String, Object> request) {
        String content = request.getOrDefault("content", "").toString();
        boolean useAi = Boolean.parseBoolean(request.getOrDefault("useAi", "true").toString());
        String userId = request.getOrDefault("userId", "anonymous").toString();
        
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");

        if (!useAi) {
            String mockRes = aiService.getMockResponse();
            saveHistory(userId, content, mockRes);
            response.put("data", mockRes);
            return ResponseEntity.ok(response);
        }

        try {
            String aiResponse = aiService.generateStructuredUI(content);
            saveHistory(userId, content, aiResponse);
            response.put("data", aiResponse);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("AI request failed, falling back to mock... Error: " + e.getMessage());
            String mockFallback = aiService.getMockResponse();
            saveHistory(userId, content, mockFallback);
            response.put("data", mockFallback);
            return ResponseEntity.ok(response);
        }
    }

    private void saveHistory(String userId, String raw, String json) {
        try {
            com.contentflow.backend.model.ContentHistory h = new com.contentflow.backend.model.ContentHistory(userId, raw, json);
            historyRepo.save(h);
        } catch (Exception e) {
            System.err.println("Could not save history: " + e.getMessage());
        }
    }
}
