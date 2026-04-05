package com.contentflow.backend.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    private final ChatClient chatClient;

    public AIService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public String generateStructuredUI(String input) {
        String prompt = "Convert the following content into structured JSON UI format.\n\n" +
                "Rules:\n" +
                "- Return ONLY valid JSON\n" +
                "- Do NOT add explanation\n" +
                "- Limit to maximum 5 keywords\n" +
                "- Use this format:\n\n" +
                "{\n" +
                "  \"sectionTitle\": \"Main Domain Title Here\",\n" +
                "  \"keywords\": [\"keyword1\", \"keyword2\"],\n" +
                "  \"layout\": \"cards | list | summary\",\n" +
                "  \"components\": [\n" +
                "    {\n" +
                "      \"type\": \"summary\",\n" +
                "      \"content\": \"...\"\n" +
                "    },\n" +
                "    {\n" +
                "      \"type\": \"list\",\n" +
                "      \"items\": [\"...\", \"...\"]\n" +
                "    },\n" +
                "    {\n" +
                "      \"type\": \"cards\",\n" +
                "      \"items\": [\n" +
                "        { \"title\": \"...\", \"description\": \"...\" }\n" +
                "      ]\n" +
                "    }\n" +
                "  ]\n" +
                "}\n\n" +
                "Content:\n" + input;

        return chatClient.prompt(new org.springframework.ai.chat.prompt.Prompt(prompt))
                .call()
                .content();
    }
    
    public String getMockResponse() {
        return """
        {
            "sectionTitle": "Fallback Content Experience",
            "keywords": ["AI", "fallback", "safe", "mock", "test"],
            "layout": "default",
            "components": [
                {
                    "type": "summary",
                    "content": "This is a fallback summary extracted from your input content because AI failed."
                },
                {
                    "type": "cards",
                    "items": [
                        {"title": "Fallback Insight 1", "description": "The Groq AI request failed, so you are seeing this."},
                        {"title": "Fallback Insight 2", "description": "Safe integration correctly fell back to mock data."}
                    ]
                },
                {
                    "type": "list",
                    "items": [
                        "Retry your request",
                        "Check your API keys in the backend"
                    ]
                }
            ]
        }
        """;
    }
}
