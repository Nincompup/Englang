import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Card from '@/models/Card';

  export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await connectDB();
    const { id } = params;
  
    try {
      const deletedCard = await Card.findByIdAndDelete(id);
      if (!deletedCard) {
        return NextResponse.json({ error: "Card not found" }, { status: 404 });
      }
      return NextResponse.json({ message: "Card deleted" });
    } catch (err) {
      return NextResponse.json({ error: "Failed to delete card" }, { status: 500 });
    }
  }