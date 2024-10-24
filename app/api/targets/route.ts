import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import targetsData from '../../../data/targets.json';

const filePath = path.resolve('./data/targets.json');

// Get request to retrieve the data
export async function GET() {
  return NextResponse.json(targetsData);
}

export async function POST(req: Request) {
  const newTargetData = await req.json();

  try {
    fs.writeFileSync(filePath, JSON.stringify(newTargetData, null, 2));
    return NextResponse.json({ message: 'Data updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating the file' }, { status: 500 });
  }
}
