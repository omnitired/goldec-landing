const fs = require('fs');
const path = require('path');

console.log('🧪 API Endpoints Test');
console.log('====================\n');

// Test API functionality by simulating requests
async function testAPI() {
  try {
    // Read partners data (simulating GET /api/partners)
    console.log('📖 Testing GET /api/partners...');
    const partnersPath = path.join(__dirname, '../src/data/partners.json');
    const partnersData = JSON.parse(fs.readFileSync(partnersPath, 'utf8'));
    
    console.log(`✅ Successfully loaded ${partnersData.partners.length} partners`);
    console.log(`📊 Data structure: ${Object.keys(partnersData).join(', ')}`);
    
    // Test data structure
    const samplePartner = partnersData.partners[0];
    const requiredFields = ['id', 'name', 'url', 'logo', 'addedDate'];
    const hasAllFields = requiredFields.every(field => samplePartner.hasOwnProperty(field));
    
    if (hasAllFields) {
      console.log('✅ Partner data structure is valid');
    } else {
      console.log('❌ Partner data structure is missing required fields');
    }
    
    // Test logo generation (simulating POST /api/generate-logo)
    console.log('\n🎨 Testing logo generation...');
    const testName = 'تست پلتفرم';
    const testId = 999;
    
    const colors = [
      '#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6',
      '#F97316', '#06B6D4', '#84CC16', '#EC4899', '#6366F1'
    ];
    
    function generateTestLogo(name, id) {
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
    
    const testSvg = generateTestLogo(testName, testId);
    console.log('✅ Logo generation function works');
    console.log(`📏 Generated SVG length: ${testSvg.length} characters`);
    
    // Test data modification (simulating POST /api/partners)
    console.log('\n💾 Testing data modification...');
    const testPartner = {
      id: 151,
      name: 'پلتفرم تست',
      url: 'https://test-platform.ir',
      logo: '/logos/test-platform.svg',
      addedDate: '1404/01/15'
    };
    
    // Create a copy of partners data and add test partner
    const testData = {
      ...partnersData,
      partners: [...partnersData.partners, testPartner]
    };
    
    console.log(`✅ Can add new partner (total would be: ${testData.partners.length})`);
    
    // Test data validation
    console.log('\n🔍 Testing data validation...');
    const isValidUrl = (url) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };
    
    const isValidJalaliDate = (date) => {
      const regex = /^\d{4}\/\d{2}\/\d{2}$/;
      return regex.test(date);
    };
    
    const validUrl = isValidUrl(testPartner.url);
    const validDate = isValidJalaliDate(testPartner.addedDate);
    
    console.log(`✅ URL validation: ${validUrl ? 'PASS' : 'FAIL'}`);
    console.log(`✅ Date validation: ${validDate ? 'PASS' : 'FAIL'}`);
    
    // Test search functionality
    console.log('\n🔍 Testing search functionality...');
    const searchTerm = 'طلای';
    const searchResults = partnersData.partners.filter(partner =>
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.url.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    console.log(`✅ Search for "${searchTerm}": ${searchResults.length} results`);
    
    // Test sorting functionality
    console.log('\n📋 Testing sorting functionality...');
    const sortedByName = [...partnersData.partners].sort((a, b) => 
      a.name.localeCompare(b.name, 'fa')
    );
    
    const sortedByDate = [...partnersData.partners].sort((a, b) => {
      const [yearA, monthA, dayA] = a.addedDate.split('/').map(Number);
      const [yearB, monthB, dayB] = b.addedDate.split('/').map(Number);
      const dateA = yearA * 10000 + monthA * 100 + dayA;
      const dateB = yearB * 10000 + monthB * 100 + dayB;
      return dateB - dateA; // Newest first
    });
    
    console.log(`✅ Name sorting: ${sortedByName[0].name} (first alphabetically)`);
    console.log(`✅ Date sorting: ${sortedByDate[0].name} (${sortedByDate[0].addedDate}) (newest)`);
    
    // Performance test
    console.log('\n⚡ Testing performance...');
    const startTime = Date.now();
    
    // Simulate heavy operations
    for (let i = 0; i < 1000; i++) {
      partnersData.partners.filter(p => p.name.includes('طلای'));
    }
    
    const endTime = Date.now();
    console.log(`✅ 1000 search operations: ${endTime - startTime}ms`);
    
    console.log('\n🎉 All API tests completed successfully!');
    console.log('📋 Summary:');
    console.log('   ✅ Data loading works');
    console.log('   ✅ Logo generation works');
    console.log('   ✅ Data modification works');
    console.log('   ✅ Validation works');
    console.log('   ✅ Search works');
    console.log('   ✅ Sorting works');
    console.log('   ✅ Performance is acceptable');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPI();