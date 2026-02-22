# Copy Helper - Marketing Angle Generator

A ChatGPT-style web application for generating and evaluating marketing copy angles using proven frameworks.

## Features

- **Chat-Based Idea Generation**: Generate marketing angles using multiple frameworks:
  - 15-Step Framework
  - 7 Deadly Sins Framework
  - Writing Great Leads Framework
- **Chat-Based Evaluation**: Evaluate angles using the Big Marketing Idea Formula checklist
- **Public Chat History**: Browse and learn from all previous conversations
- **AI-Powered**: Uses OpenAI GPT-4 for intelligent angle generation

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma (Database ORM)
- PostgreSQL (or SQLite)
- OpenAI API

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# OpenAI API Key (required)
OPENAI_API_KEY=your_openai_api_key_here

# Database URL
# Option 1: PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/copy_helper?schema=public"

# Option 2: SQLite (simpler for development)
DATABASE_URL="file:./dev.db"
```

### 3. Set Up Database

If using PostgreSQL, create a database first:

```sql
CREATE DATABASE copy_helper;
```

Then run Prisma migrations:

```bash
npx prisma migrate dev --name init
```

This will create all the necessary tables.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Start a Conversation**: Enter a product description on the home page
2. **Generate Angles**: Ask the AI to generate marketing angles using various frameworks
3. **Evaluate Ideas**: Click "Evaluate this angle" on any generated angle to get a detailed evaluation
4. **Browse History**: Visit the Browse page to see all previous conversations

## Project Structure

```
/app
  /api
    /chat - Chat message handling
    /conversations - Conversation CRUD
  /chat/[id] - Chat interface page
  /browse - Browse conversations page
  page.tsx - Home page
/lib
  ai-prompts.ts - AI prompt templates with all frameworks
  db.ts - Database connection
/prisma
  schema.prisma - Database schema
```

## Database Schema

- **Conversations**: Stores conversation metadata
- **Messages**: Stores all chat messages
- **Ideas**: Stores extracted ideas (for future use)
- **Evaluations**: Stores evaluation results (for future use)

## Notes

- All conversations are public and browsable by everyone
- No authentication required
- Uses your OpenAI API key (make sure to set usage limits if needed)
