// Debug script to test API call
const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('Testing API call...');
    const response = await fetch('https://panel.zarnext.com/public/api/v1/platforms');
    const data = await response.json();
    
    console.log('API Response:');
    console.log(JSON.stringify(data, null, 2));
    
    if (data.data && Array.isArray(data.data)) {
      console.log('\nTransformed data:');
      data.data.forEach((platform, index) => {
        console.log(`Platform ${index + 1}:`);
        console.log(`  Name: ${platform.name}`);
        console.log(`  Legal Name: ${platform.legal_name}`);
        console.log(`  Website: ${platform.website_url}`);
        console.log(`  ID: ${platform.id}`);
        
        // Test logo name generation
        let logoName = platform.name.toLowerCase().replace(/\s+/g, '-');
        const persianToEnglish = {
          'اینوی': 'envi',
        };
        
        if (persianToEnglish[platform.name]) {
          logoName = persianToEnglish[platform.name];
        } else {
          logoName = logoName.replace(/[^a-z0-9-]/g, '') || 'default';
        }
        
        console.log(`  Generated logo name: ${logoName}`);
        console.log(`  Logo path: /logos/${logoName}-gold.svg`);
        console.log('---');
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testAPI();