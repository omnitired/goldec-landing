const fs = require('fs');
const path = require('path');

// Create logos directory if it doesn't exist
const logosDir = path.join(__dirname, '../public/logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

// Colors for different logo styles
const colors = [
  '#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6',
  '#F97316', '#06B6D4', '#84CC16', '#EC4899', '#6366F1'
];

// Generate SVG logo for a partner
function generateLogo(name, id) {
  const initials = name.split(' ').map(word => word[0]).join('').substring(0, 3);
  const colorIndex = id % colors.length;
  const primaryColor = colors[colorIndex];
  const secondaryColor = colors[(colorIndex + 1) % colors.length];
  
  const svg = `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
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
  
  return svg;
}

// Read partners data
const partnersData = require('../src/data/partners.json');

// Generate logos for all partners
partnersData.partners.forEach(partner => {
  const logoSvg = generateLogo(partner.name, partner.id);
  const fileName = partner.logo.split('/').pop();
  const filePath = path.join(logosDir, fileName);
  
  fs.writeFileSync(filePath, logoSvg);
  console.log(`Generated logo for ${partner.name} -> ${fileName}`);
});

console.log(`\nGenerated ${partnersData.partners.length} logos successfully!`);
console.log(`Logos saved to: ${logosDir}`);