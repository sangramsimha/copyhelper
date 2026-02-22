import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { prisma } from '@/lib/db';
import { getAngleGenerationPrompt, getEvaluationPrompt, getPostEvaluationAnglePrompt } from '@/lib/ai-prompts';

function getOpenAIClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey || apiKey === 'your_openai_api_key_here' || apiKey.trim() === '') {
    console.error('OpenAI API key is not configured');
    return null;
  }
  
  try {
    return new OpenAI({
      apiKey: apiKey.trim(),
    });
  } catch (error) {
    console.error('Failed to initialize OpenAI client:', error);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    // Get OpenAI client (reads env var dynamically on each request)
    const openai = getOpenAIClient();
    
    // Check if OpenAI is configured
    if (!openai) {
      console.error('OpenAI API key check:', {
        hasKey: !!process.env.OPENAI_API_KEY,
        keyValue: process.env.OPENAI_API_KEY ? `${process.env.OPENAI_API_KEY.substring(0, 10)}...` : 'undefined'
      });
      return NextResponse.json(
        { error: 'OpenAI API key is not configured. Please add your API key to the .env file and restart the server.' },
        { status: 500 }
      );
    }

    const { conversationId, message, messageType, productDescription } = await req.json();

    if (!message || !conversationId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get conversation history
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    // Save user message
    await prisma.message.create({
      data: {
        conversationId,
        role: 'user',
        content: message,
        messageType: messageType || 'idea_generation',
      },
    });

    // Build conversation context
    const messages = conversation.messages.map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));

    // Determine system prompt based on message type
    let systemPrompt = '';
    if (messageType === 'evaluation') {
      // Extract idea from message if it's an evaluation request
      systemPrompt = getEvaluationPrompt(message, productDescription || conversation.productDescription);
    } else {
      // For idea generation, use the framework prompt
      systemPrompt = getAngleGenerationPrompt(productDescription || conversation.productDescription);
    }

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        ...messages,
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.8,
    });

    let assistantMessage = completion.choices[0]?.message?.content || '';

    // If this was an evaluation, generate 2 new improved angles
    if (messageType === 'evaluation') {
      const postEvaluationPrompt = getPostEvaluationAnglePrompt(
        productDescription || conversation.productDescription,
        message, // the evaluated idea
        assistantMessage // the evaluation results
      );

      const postEvaluationCompletion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: postEvaluationPrompt,
          },
          ...messages,
          {
            role: 'user',
            content: message,
          },
          {
            role: 'assistant',
            content: assistantMessage,
          },
          {
            role: 'user',
            content: 'Now generate 2 new improved angles based on this evaluation.',
          },
        ],
        temperature: 0.8,
      });

      const newAngles = postEvaluationCompletion.choices[0]?.message?.content || '';
      
      // Append the new angles to the evaluation response
      assistantMessage += '\n\n---\n\n## 🎯 2 New Improved Angles (Based on Evaluation)\n\n' + newAngles;
    }

    // Save assistant response (with evaluation + new angles if it was an evaluation)
    await prisma.message.create({
      data: {
        conversationId,
        role: 'assistant',
        content: assistantMessage,
        messageType: messageType || 'idea_generation',
      },
    });

    // Update conversation timestamp
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json({
      message: assistantMessage,
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to process chat message';
    if (error.message) {
      errorMessage = error.message;
    } else if (error.response) {
      errorMessage = `OpenAI API error: ${error.response.status} - ${error.response.statusText}`;
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Could not connect to OpenAI API. Please check your internet connection.';
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
