import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Card from '@/models/Card';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await connectDB(); // Connect to MongoDB
    const card = await Card.create(body);

    return NextResponse.json({ message: 'Card saved', card }, { status: 201 });
  } catch (error) {
    console.error('DB Save Error:', error);
    return NextResponse.json({ message: 'Failed to save card' }, { status: 500 });
  }
}

export async function GET() {
    try {
      await connectDB();
      const cards = await Card.find().sort({ createdAt: -1 });
      return NextResponse.json(cards, { status: 200 });
    } catch (error) {
      console.error('GET cards error:', error);
      return NextResponse.json({ message: 'Failed to fetch cards' }, { status: 500 });
    }
  }
