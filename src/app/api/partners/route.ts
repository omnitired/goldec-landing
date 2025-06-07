import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';
export const revalidate = false;

const partnersFilePath = path.join(process.cwd(), 'src/data/partners.json');

export async function GET() {
  try {
    const fileContent = fs.readFileSync(partnersFilePath, 'utf8');
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading partners file:', error);
    return NextResponse.json({ error: 'Failed to read partners data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.partners || !Array.isArray(body.partners)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    // Read current data to preserve settings
    const currentData = JSON.parse(fs.readFileSync(partnersFilePath, 'utf8'));
    
    // Update partners while preserving settings
    const updatedData = {
      ...currentData,
      partners: body.partners
    };

    fs.writeFileSync(partnersFilePath, JSON.stringify(updatedData, null, 2));
    
    return NextResponse.json({ success: true, message: 'Partners updated successfully' });
  } catch (error) {
    console.error('Error writing partners file:', error);
    return NextResponse.json({ error: 'Failed to update partners data' }, { status: 500 });
  }
}