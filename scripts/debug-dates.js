const moment = require('moment-jalaali');

console.log('🐛 Jalali Date Debug Tool');
console.log('=========================\n');

// Test current date generation
console.log('📅 Current Date Generation:');
try {
  const now = moment();
  const jalaliNow = now.format('jYYYY/jMM/jDD');
  console.log(`✅ Current Jalali date: ${jalaliNow}`);
  console.log(`✅ Gregorian equivalent: ${now.format('YYYY-MM-DD')}`);
} catch (error) {
  console.error('❌ Error generating current date:', error.message);
}

// Test date parsing
console.log('\n🔍 Date Parsing Tests:');
const testDates = [
  '1404/01/15',
  '1403/12/29',
  '1404/1/1',
  '1404/01/01',
  'invalid',
  '1404/13/01',
  '1404/01/32'
];

function parseJalaliDate(dateString) {
  if (!dateString || typeof dateString !== 'string') {
    throw new Error('Invalid date string');
  }
  
  const parts = dateString.split('/');
  if (parts.length !== 3) {
    throw new Error('Date must be in YYYY/MM/DD format');
  }
  
  const [year, month, day] = parts.map(Number);
  
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    throw new Error('Date parts must be valid numbers');
  }
  
  return { year, month, day };
}

function getRelativeJalaliDate(dateString) {
  try {
    const { year, month, day } = parseJalaliDate(dateString);
    
    // Validate parsed values
    if (year < 1300 || year > 1500 || month < 1 || month > 12 || day < 1 || day > 31) {
      return 'تاریخ نامعتبر';
    }
    
    const date = moment(`${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`, 'jYYYY/jMM/jDD');
    const now = moment();
    
    if (!date.isValid()) {
      return 'تاریخ نامعتبر';
    }
    
    const diffDays = now.diff(date, 'days');
    
    if (diffDays === 0) {
      return 'امروز';
    } else if (diffDays === 1) {
      return 'دیروز';
    } else if (diffDays < 0 && diffDays > -2) {
      return 'فردا';
    } else if (diffDays < 0) {
      return `${Math.abs(diffDays)} روز دیگر`;
    } else if (diffDays < 7) {
      return `${diffDays} روز پیش`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} هفته پیش`;
    } else {
      const diffMonths = now.diff(date, 'months');
      if (diffMonths < 12) {
        return `${diffMonths} ماه پیش`;
      } else {
        const diffYears = now.diff(date, 'years');
        return `${diffYears} سال پیش`;
      }
    }
  } catch (error) {
    console.error('Error calculating relative date:', error.message);
    return 'تاریخ نامعتبر';
  }
}

testDates.forEach(dateStr => {
  try {
    const parsed = parseJalaliDate(dateStr);
    const relative = getRelativeJalaliDate(dateStr);
    console.log(`✅ "${dateStr}" → Year: ${parsed.year}, Month: ${parsed.month}, Day: ${parsed.day} → ${relative}`);
  } catch (error) {
    console.log(`❌ "${dateStr}" → Error: ${error.message}`);
  }
});

// Test today's date specifically
console.log('\n📍 Today\'s Date Analysis:');
const today = moment().format('jYYYY/jMM/jDD');
console.log(`Today: ${today}`);
console.log(`Relative: ${getRelativeJalaliDate(today)}`);

// Test a date that might be causing issues
console.log('\n🔧 Fixing Common Issues:');
const problematicDate = '1404';
console.log(`Testing problematic date: "${problematicDate}"`);
try {
  const result = getRelativeJalaliDate(problematicDate);
  console.log(`Result: ${result}`);
} catch (error) {
  console.log(`Error handled: ${error.message}`);
}

// Test auto-generation of current date
console.log('\n⚙️ Current Date Auto-Generation:');
function getCurrentJalaliDate() {
  try {
    const now = moment();
    return now.format('jYYYY/jMM/jDD');
  } catch (error) {
    console.error('Error getting current Jalali date:', error);
    return '1404/01/15';
  }
}

const currentDate = getCurrentJalaliDate();
console.log(`Generated current date: ${currentDate}`);
console.log(`Is valid: ${currentDate.split('/').length === 3 && !isNaN(parseInt(currentDate.split('/')[0]))}`);

console.log('\n✅ Debug complete!');