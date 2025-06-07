import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';
export const revalidate = false;

const colors = [
  '#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6',
  '#F97316', '#06B6D4', '#84CC16', '#EC4899', '#6366F1'
];

function generateLogo(name: string, id: number): string {
  const initials = name.split(' ').map(word => word[0]).join('').substring(0, 3);
  const colorIndex = id % colors.length;
  const primaryColor = colors[colorIndex];
  const secondaryColor = colors[(colorIndex + 1) % colors.length];
  
  return `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="40" fill="url(#grad${id})"/>
  <circle cx="100" cy="100" r="60" fill="rgba(255,255,255,0.2)"/>
  <text x="100" y="115" font-family="Arial, sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="white">${initials}</text>
</svg>`;
}

export async function POST(request: NextRequest) {
  try {
    const { name, id } = await request.json();
    
    if (!name || !id) {
      return NextResponse.json({ error: 'Name and ID are required' }, { status: 400 });
    }

    const logoSvg = generateLogo(name, id);
    const fileName = `${name.replace(/\s+/g, '-').toLowerCase()}.svg`;
    const logoPath = path.join(process.cwd(), 'public/logos', fileName);
    
    // Ensure logos directory exists
    const logosDir = path.dirname(logoPath);
    if (!fs.existsSync(logosDir)) {
      fs.mkdirSync(logosDir, { recursive: true });
    }
    
    fs.writeFileSync(logoPath, logoSvg);
    
    return NextResponse.json({ 
      success: true, 
      logoPath: `/logos/${fileName}`,
      message: 'Logo generated successfully' 
    });
  } catch (error) {
    console.error('Error generating logo:', error);
    return NextResponse.json({ error: 'Failed to generate logo' }, { status: 500 });
  }
}