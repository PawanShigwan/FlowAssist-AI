Create a clean and modern system architecture diagram for a web application called:

"ContentFlow AI – Content to Experience Platform"

The architecture should be visual, structured, and easy to understand, using labeled components and arrows to show data flow.

Include the following components:

1. Frontend Layer
- Next.js (React-based UI)
- Tailwind CSS + Material UI
- Features:
  - Content Input Page
  - AI UI Preview Mode
  - Dynamic Renderer (Cards, Lists, Summary)
  - HighlightText (keyword highlighting)

2. API Layer / Backend
- Spring Boot REST API
- Endpoints:
  - /api/content/transform
  - /auth/login (optional)
  - /auth/register (optional)

3. AI Processing Layer
- Spring AI integration
- Groq API (LLM inference)
- Function:
  - Converts raw text → structured JSON
  - Extracts summary, lists, cards, keywords

4. Database Layer
- MongoDB
- Stores:
  - User data
  - Content history
  - AI-generated outputs

5. Deployment Layer
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

6. Data Flow (very important)
Show arrows:
- User → Frontend (input text)
- Frontend → Backend (API request)
- Backend → AI Layer (prompt processing)
- AI → Backend (JSON response)
- Backend → Frontend (structured data)
- Frontend → UI Rendering (cards/lists)

7. Optional Enhancements
- Error handling fallback (Mock Mode)
- Loading state (Generating UI…)

Design Instructions:
- Use layered architecture (Frontend → Backend → AI → Database)
- Use icons for each layer (browser, server, AI brain, database)
- Use arrows to clearly show data flow
- Keep layout minimal and clean (no clutter)
- Use modern color palette and card-based blocks
- Make it presentation-ready for a technical demo
