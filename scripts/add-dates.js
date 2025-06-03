const fs = require('fs');
const path = require('path');

// Read the current partners data
const partnersPath = path.join(__dirname, '../src/data/partners.json');
const partnersData = JSON.parse(fs.readFileSync(partnersPath, 'utf8'));

// Generate Jalali dates starting from 1403/01/15 (roughly March 2024)
const startYear = 1403;
const startMonth = 1;
const startDay = 15;

function addDaysToJalaliDate(year, month, day, daysToAdd) {
  const daysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]; // Persian calendar
  
  let currentYear = year;
  let currentMonth = month;
  let currentDay = day + daysToAdd;
  
  while (currentDay > daysInMonth[currentMonth - 1]) {
    currentDay -= daysInMonth[currentMonth - 1];
    currentMonth++;
    
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
  }
  
  return `${currentYear}/${currentMonth.toString().padStart(2, '0')}/${currentDay.toString().padStart(2, '0')}`;
}

// Add dates to all partners (spread over about 10 months)
partnersData.partners.forEach((partner, index) => {
  const daysToAdd = Math.floor(index * 2.5); // Spread partners over time
  partner.addedDate = addDaysToJalaliDate(startYear, startMonth, startDay, daysToAdd);
});

// Write the updated data back to the file
fs.writeFileSync(partnersPath, JSON.stringify(partnersData, null, 2), 'utf8');

console.log(`Added Jalali dates to ${partnersData.partners.length} partners`);
console.log(`Date range: ${partnersData.partners[0].addedDate} to ${partnersData.partners[partnersData.partners.length - 1].addedDate}`);