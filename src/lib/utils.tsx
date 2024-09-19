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

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.toLocaleDateString('en-US', { day: '2-digit' });
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.toLocaleDateString('en-US', { year: 'numeric' });
  return `${day} ${month} ${year}`;
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

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function extractImageUrls(htmlString: string) {
  const imgUrlSet = new Set();

  const imgRegex = /<img[^>]+src="?([^"\s]+)"?\s*\/?>/gi;
  let match;
  while ((match = imgRegex.exec(htmlString)) !== null) {
    if (match[1]) imgUrlSet.add(match[1]);
  }

  const urlRegex = /https?:\/\/\S+\.(?:jpg|jpeg|gif|png|svg|webp)/gi;
  while ((match = urlRegex.exec(htmlString)) !== null) {
    imgUrlSet.add(match[0]);
  }

  return Array.from(imgUrlSet);
}
