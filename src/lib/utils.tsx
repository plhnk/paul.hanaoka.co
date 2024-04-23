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

  return { year, month, today, dayOfWeek, dayOfWeekNo, daysLeft };
}

export function pluralize(input: number): string {
  if (input === 1) {
    return '';
  } else {
    return 's';
  }
}
