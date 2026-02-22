import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: Prisma.ConversationWhereInput = search
      ? {
          OR: [
            { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { productDescription: { contains: search, mode: Prisma.QueryMode.insensitive } },
          ],
        }
      : {};

    const conversations = await prisma.conversation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: 'asc' },
        },
        _count: {
          select: { messages: true },
        },
      },
    });

    const total = await prisma.conversation.count({ where });

    return NextResponse.json({
      conversations,
      total,
      hasMore: offset + limit < total,
    });
  } catch (error: any) {
    console.error('Conversations API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch conversations' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { productDescription, title } = await req.json();

    if (!productDescription) {
      return NextResponse.json({ error: 'Product description is required' }, { status: 400 });
    }

    const conversation = await prisma.conversation.create({
      data: {
        productDescription,
        title: title || `Product: ${productDescription.substring(0, 50)}...`,
      },
    });

    return NextResponse.json({ conversation });
  } catch (error: any) {
    console.error('Create conversation error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to create conversation';
    if (error.code === 'P1001') {
      errorMessage = 'Database connection failed. Please check your DATABASE_URL environment variable.';
    } else if (error.code === 'P2002') {
      errorMessage = 'A conversation with this description already exists.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
