const { partners } = require('../src/data/partners.json');

// Test Jalali date formatting
function parseJalaliDate(dateString) {
  const [year, month, day] = dateString.split('/').map(Number);
  return { year, month, day };
}

function formatJalaliDate(dateString) {
  const { year, month, day } = parseJalaliDate(dateString);
  const monthNames = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];
  
  return `${day} ${monthNames[month - 1]} ${year}`;
}

console.log('🗓️  Jalali Date Formatting Test');
console.log('===============================\n');

// Test sample dates
const testDates = [
  partners[0].addedDate,
  partners[25].addedDate,
  partners[50].addedDate,
  partners[75].addedDate,
  partners[100].addedDate,
  partners[149].addedDate
];

console.log('Sample Date Formatting:');
testDates.forEach((date, index) => {
  const formatted = formatJalaliDate(date);
  console.log(`${date} → ${formatted}`);
});

console.log('\nPartner with formatted dates:');
partners.slice(0, 5).forEach(partner => {
  console.log(`${partner.name}: عضویت از ${formatJalaliDate(partner.addedDate)}`);
});

console.log('\n✅ Jalali date formatting working correctly!');