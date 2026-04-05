package com.contentflow.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "content_history")
public class ContentHistory {
    @Id
    private String id;
    private String userId;
    private String originalContent;
    private String generatedJsonUI;
    private LocalDateTime createdAt;

    public ContentHistory() {}

    public ContentHistory(String userId, String originalContent, String generatedJsonUI) {
        this.userId = userId;
        this.originalContent = originalContent;
        this.generatedJsonUI = generatedJsonUI;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getOriginalContent() { return originalContent; }
    public void setOriginalContent(String originalContent) { this.originalContent = originalContent; }
    public String getGeneratedJsonUI() { return generatedJsonUI; }
    public void setGeneratedJsonUI(String generatedJsonUI) { this.generatedJsonUI = generatedJsonUI; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
