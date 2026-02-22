import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  return NextResponse.json({
    hasKey: !!apiKey,
    keyLength: apiKey?.length || 0,
    keyPreview: apiKey ? `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 5)}` : 'undefined',
    isPlaceholder: apiKey === 'your_openai_api_key_here',
    allEnvKeys: Object.keys(process.env).filter(k => k.includes('OPENAI')),
  });
}
