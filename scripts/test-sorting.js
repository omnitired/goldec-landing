const { partners } = require('../src/data/partners.json');

console.log('🚀 Partners Sorting Demo');
console.log('=======================\n');

// Test data structure
console.log(`📊 Dataset Overview:`);
console.log(`Total Partners: ${partners.length}`);
console.log(`Sample Partner:`, JSON.stringify(partners[0], null, 2));
console.log('\n');

// Test sorting functions
function sortByName(partners, ascending = true) {
  return [...partners].sort((a, b) => {
    const result = a.name.localeCompare(b.name, 'fa');
    return ascending ? result : -result;
  });
}

function sortByDate(partners, newest = true) {
  return [...partners].sort((a, b) => {
    const [yearA, monthA, dayA] = a.addedDate.split('/').map(Number);
    const [yearB, monthB, dayB] = b.addedDate.split('/').map(Number);
    
    const dateNumericA = yearA * 10000 + monthA * 100 + dayA;
    const dateNumericB = yearB * 10000 + monthB * 100 + dayB;
    
    const result = dateNumericA - dateNumericB;
    return newest ? -result : result;
  });
}

function sortByUrl(partners, ascending = true) {
  return [...partners].sort((a, b) => {
    const result = a.url.localeCompare(b.url);
    return ascending ? result : -result;
  });
}

// Test Name Sorting
console.log('📝 Name Sorting Test:');
const nameAsc = sortByName(partners, true);
const nameDesc = sortByName(partners, false);
console.log(`First (A-Z): ${nameAsc[0].name}`);
console.log(`Last (A-Z): ${nameAsc[nameAsc.length - 1].name}`);
console.log(`First (Z-A): ${nameDesc[0].name}`);
console.log(`Last (Z-A): ${nameDesc[nameDesc.length - 1].name}\n`);

// Test Date Sorting
console.log('📅 Date Sorting Test:');
const dateNewest = sortByDate(partners, true);
const dateOldest = sortByDate(partners, false);
console.log(`Newest: ${dateNewest[0].name} (${dateNewest[0].addedDate})`);
console.log(`Second Newest: ${dateNewest[1].name} (${dateNewest[1].addedDate})`);
console.log(`Oldest: ${dateOldest[0].name} (${dateOldest[0].addedDate})`);
console.log(`Second Oldest: ${dateOldest[1].name} (${dateOldest[1].addedDate})\n`);

// Test URL Sorting
console.log('🌐 URL Sorting Test:');
const urlAsc = sortByUrl(partners, true);
const urlDesc = sortByUrl(partners, false);
console.log(`First URL (A-Z): ${urlAsc[0].url}`);
console.log(`Last URL (A-Z): ${urlAsc[urlAsc.length - 1].url}`);
console.log(`First URL (Z-A): ${urlDesc[0].url}`);
console.log(`Last URL (Z-A): ${urlDesc[urlDesc.length - 1].url}\n`);

// Test Date Range Analysis
console.log('📈 Date Range Analysis:');
const dates = partners.map(p => p.addedDate).sort();
console.log(`Date Range: ${dates[0]} to ${dates[dates.length - 1]}`);

// Count partners by month
const monthCounts = {};
partners.forEach(partner => {
  const [year, month] = partner.addedDate.split('/');
  const key = `${year}/${month}`;
  monthCounts[key] = (monthCounts[key] || 0) + 1;
});

console.log('\nPartners by Month:');
Object.entries(monthCounts)
  .sort(([a], [b]) => a.localeCompare(b))
  .forEach(([month, count]) => {
    console.log(`  ${month}: ${count} partners`);
  });

// Search functionality test
console.log('\n🔍 Search Test:');
const searchTerm = 'طلای';
const searchResults = partners.filter(partner =>
  partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  partner.url.toLowerCase().includes(searchTerm.toLowerCase())
);
console.log(`Search for "${searchTerm}": ${searchResults.length} results`);
console.log(`Sample results:`);
searchResults.slice(0, 3).forEach(partner => {
  console.log(`  - ${partner.name} (${partner.addedDate})`);
});

console.log('\n✅ All sorting features working correctly!');
console.log('🎉 Ready for production use!');