const fs = require('fs');
const path = require('path');
const moment = require('moment-jalaali');

console.log('🔧 Fixing Invalid Dates in Partners Data');
console.log('=========================================\n');

const partnersPath = path.join(__dirname, '../src/data/partners.json');
const partnersData = JSON.parse(fs.readFileSync(partnersPath, 'utf8'));

function isValidJalaliDate(dateString) {
  if (!dateString || typeof dateString !== 'string') {
    return false;
  }
  
  const parts = dateString.split('/');
  if (parts.length !== 3) {
    return false;
  }
  
  const [year, month, day] = parts.map(Number);
  
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return false;
  }
  
  return year >= 1300 && year <= 1500 && month >= 1 && month <= 12 && day >= 1 && day <= 31;
}

function generateValidDate(index) {
  // Generate dates starting from 1403/01/15 with incremental spacing
  const baseYear = 1403;
  const baseMonth = 1;
  const baseDay = 15;
  
  const daysToAdd = Math.floor(index * 2.5);
  const date = moment(`${baseYear}/${baseMonth.toString().padStart(2, '0')}/${baseDay.toString().padStart(2, '0')}`, 'jYYYY/jMM/jDD');
  date.add(daysToAdd, 'days');
  
  return date.format('jYYYY/jMM/jDD');
}

let fixedCount = 0;
let validCount = 0;

partnersData.partners.forEach((partner, index) => {
  if (isValidJalaliDate(partner.addedDate)) {
    validCount++;
    console.log(`✅ ${partner.name}: ${partner.addedDate} (valid)`);
  } else {
    const newDate = generateValidDate(index);
    console.log(`🔧 ${partner.name}: ${partner.addedDate || 'undefined'} → ${newDate} (fixed)`);
    partner.addedDate = newDate;
    fixedCount++;
  }
});

// Write the fixed data back to file
fs.writeFileSync(partnersPath, JSON.stringify(partnersData, null, 2), 'utf8');

console.log(`\n📊 Summary:`);
console.log(`   ✅ Valid dates: ${validCount}`);
console.log(`   🔧 Fixed dates: ${fixedCount}`);
console.log(`   📝 Total partners: ${partnersData.partners.length}`);
console.log(`\n💾 Updated partners.json file successfully!`);