import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDateInfo() {
  const date = new Date();
  const year = date.toLocaleDateString('en-US', { year: 'numeric' });
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const today = date.toLocaleDateString('en-US', { day: 'numeric' });
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  const dayOfWeekNo = date.getDay();
  const remainingDays =
    new Date(date.getFullYear(), 11, 31).getTime() - date.getTime();
  const daysLeft = Math.ceil(remainingDays / (1000 * 60 * 60 * 24));
  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };
  const daysInYear = isLeapYear(date.getFullYear()) ? 366 : 365;

  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const daysPassed: number = Math.ceil(
    (date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
  );
  const percentageOfYearPassed = (daysPassed / daysInYear) * 100;

  return {
    year,
    month,
    today,
    dayOfWeek,
    dayOfWeekNo,
    daysLeft,
    percentageOfYearPassed: percentageOfYearPassed.toFixed(0),
  };
}

export function pluralize(input: number): string {
  if (input === 1) {
    return '';
  } else {
    return 's';
  }
}

export function convertIdToFilename(id: string): string {
  // Convert to lowercase
  const lowerCaseId = id.toLowerCase();

  // Replace spaces with hyphens
  const hyphenatedId = lowerCaseId.replace(/\s+/g, '-');

  // Append ".jpg" to the end
  const filename = hyphenatedId + '.jpg';

  return filename;
}

export function yearsSince(year: number): number {
  const date = new Date();

  const currentYear = date.toLocaleDateString('en-US', { year: 'numeric' });

  const years = Number(currentYear) - year;

  return years;
}
