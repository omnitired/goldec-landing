import moment from 'moment-jalaali';
import { toFarsiDigits } from './utils';

export interface JalaliDate {
  year: number;
  month: number;
  day: number;
}

export function parseJalaliDate(dateString: string): JalaliDate {
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

export function formatJalaliDate(dateString: string): string {
  try {
    const { year, month, day } = parseJalaliDate(dateString);
    const monthNames = [
      'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
      'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ];
    
    if (month < 1 || month > 12) {
      return dateString; // Return original if invalid
    }
    
    return `${toFarsiDigits(day)} ${monthNames[month - 1]} ${toFarsiDigits(year)}`;
  } catch (error) {
    console.error('Error formatting Jalali date:', error);
    return dateString; // Return original string if parsing fails
  }
}

export function getRelativeJalaliDate(dateString: string): string {
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
    const diffMonths = now.diff(date, 'months');
    const diffYears = now.diff(date, 'years');
    
    if (diffDays === 0) {
      return 'امروز';
    } else if (diffDays === 1) {
      return 'دیروز';
    } else if (diffDays < 0 && diffDays > -2) {
      return 'فردا';
    } else if (diffDays < 0) {
      return `${toFarsiDigits(Math.abs(diffDays))} روز دیگر`;
    } else if (diffDays < 7) {
      return `${toFarsiDigits(diffDays)} روز پیش`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${toFarsiDigits(weeks)} هفته پیش`;
    } else if (diffMonths < 12) {
      return `${toFarsiDigits(diffMonths)} ماه پیش`;
    } else {
      return `${toFarsiDigits(diffYears)} سال پیش`;
    }
  } catch (error) {
    console.error('Error calculating relative Jalali date:', error);
    return 'تاریخ نامعتبر';
  }
}

export function sortByJalaliDate(dateA: string, dateB: string, ascending: boolean = true): number {
  const { year: yearA, month: monthA, day: dayA } = parseJalaliDate(dateA);
  const { year: yearB, month: monthB, day: dayB } = parseJalaliDate(dateB);
  
  const dateNumericA = yearA * 10000 + monthA * 100 + dayA;
  const dateNumericB = yearB * 10000 + monthB * 100 + dayB;
  
  const result = dateNumericA - dateNumericB;
  return ascending ? result : -result;
}

export function isValidJalaliDate(dateString: string): boolean {
  try {
    const { year, month, day } = parseJalaliDate(dateString);
    return year >= 1300 && year <= 1500 && month >= 1 && month <= 12 && day >= 1 && day <= 31;
  } catch {
    return false;
  }
}

export function getCurrentJalaliDate(): string {
  try {
    const now = moment();
    return now.format('jYYYY/jMM/jDD');
  } catch (error) {
    console.error('Error getting current Jalali date:', error);
    // Fallback to a reasonable current date
    return '1404/01/15';
  }
}