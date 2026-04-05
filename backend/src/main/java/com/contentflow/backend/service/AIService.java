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
        String prompt = "Convert the following content into a premium, structured JSON UI format.\n\n" +
                "Rules:\n" +
                "- Return ONLY valid JSON\n" +
                "- Do NOT add explanation\n" +
                "- Identify process steps as 'workflow'\n" +
                "- Identify key-value data as 'structured_info'\n" +
                "- Format:\n\n" +
                "{\n" +
                "  \"sectionTitle\": \"Main Topic Title\",\n" +
                "  \"keywords\": [\"key1\", \"key2\"],\n" +
                "  \"components\": [\n" +
                "    { \"type\": \"summary\", \"content\": \"Brief overview\" },\n" +
                "    { \"type\": \"workflow\", \"items\": [{\"title\": \"Step 1\", \"description\": \"...\"}] },\n" +
                "    { \"type\": \"structured_info\", \"items\": [{\"label\": \"Metric\", \"value\": \"Data\"}] },\n" +
                "    { \"type\": \"cards\", \"items\": [{\"title\": \"...\", \"description\": \"...\"}] }\n" +
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
            "sectionTitle": "Software Engineering Lifecycle",
            "keywords": ["Agile", "DevOps", "CI/CD", "Quality", "Scalability"],
            "components": [
                {
                    "type": "summary",
                    "content": "A systematic approach to the design, development, operation, and maintenance of software systems ensuring efficiency and reliability."
                },
                {
                    "type": "workflow",
                    "items": [
                        {"title": "Requirement Analysis", "description": "Defining the core needs and constraints of the the user and system."},
                        {"title": "System Design", "description": "Creating the architecture and high-level structure of the application."},
                        {"title": "Implementation", "description": "Actual coding and unit testing phase using modular principles."},
                        {"title": "Deployment", "description": "Pushing the code into production using CI/CD pipelines."}
                    ]
                },
                {
                    "type": "structured_info",
                    "items": [
                        {"label": "Methodology", "value": "Agile / Scrum"},
                        {"label": "Reliability", "value": "99.99% Availability"},
                        {"label": "Tooling", "value": "Git, Docker, Kubernetes"}
                    ]
                },
                {
                    "type": "cards",
                    "items": [
                        {"title": "Scalability", "description": "The ability of a system to handle growing amounts of work."},
                        {"title": "Maintainability", "description": "How easily a software can be modified to correct faults or improve performance."}
                    ]
                }
            ]
        }
        """;
    }
}
