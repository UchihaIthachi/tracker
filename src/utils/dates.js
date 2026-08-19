import {
  differenceInDays,
  addDays,
  format,
  isBefore,
  isAfter,
  startOfDay,
  isSaturday,
  isSunday,
  isSameDay
} from 'date-fns';
import { PLAN_START_DATE, PLAN_DURATION_DAYS } from '../data/constants.js';

export function getPlanDay(date = new Date()) {
  const start = startOfDay(PLAN_START_DATE);
  const current = startOfDay(date);

  if (isBefore(current, start)) return null;

  const diff = differenceInDays(current, start) + 1; // Day 1 is the start date
  if (diff > PLAN_DURATION_DAYS) return PLAN_DURATION_DAYS; // Or null if strictly after
  return diff;
}

export function getPlanWeek(date = new Date()) {
  const day = getPlanDay(date);
  if (day === null) return 0; // Pre-launch week is Week 0
  if (day > PLAN_DURATION_DAYS) return 53; // Approximate end week
  return Math.ceil(day / 7);
}

export function getPlanMonth(date = new Date()) {
  const day = getPlanDay(date);
  if (day === null) return 0;
  return Math.ceil(day / 30.416); // Approximate month
}

export function getDateKey(date = new Date()) {
  return format(date, 'yyyy-MM-dd');
}

export function getWeekKey(weekNumber) {
  if (weekNumber === 0) return 'pre-launch';
  return `plan-week-${String(weekNumber).padStart(3, '0')}`;
}

export function getPlanStatus(date = new Date()) {
  const start = startOfDay(PLAN_START_DATE);
  const end = addDays(start, PLAN_DURATION_DAYS - 1); // 365 days means 364 days after start
  const current = startOfDay(date);

  if (isBefore(current, start)) {
    const daysUntil = differenceInDays(start, current);
    return {
      status: 'pre-launch',
      week: 0,
      message: `${daysUntil} day${daysUntil !== 1 ? 's' : ''} until your FinTech Career OS begins.`
    };
  }

  if (isAfter(current, end)) {
    return {
      status: 'complete',
      message: 'Year Complete'
    };
  }

  const day = getPlanDay(current);
  const daysRemaining = PLAN_DURATION_DAYS - day;
  const percentage = Math.floor((day / PLAN_DURATION_DAYS) * 100);

  return {
    status: 'active',
    day,
    week: getPlanWeek(current),
    month: getPlanMonth(current),
    daysRemaining,
    percentage,
  };
}

export function getDatesForWeek(weekNumber) {
    if(weekNumber === null || weekNumber === undefined || weekNumber > 53) return [];

    // For pre-launch week, we will just return dates based on current week so user can log habits
    // even though the plan hasn't started yet. Let's return the current week dates relative to today.
    if(weekNumber === 0) {
        const today = new Date();
        const start = addDays(today, - (getDay(today) === 0 ? 6 : getDay(today) - 1)); // start on Monday
        const dates = [];
        for(let i=0; i<7; i++) {
            dates.push(addDays(start, i));
        }
        return dates;
    }

    const weekStart = addDays(PLAN_START_DATE, (weekNumber - 1) * 7);
    const dates = [];
    for(let i=0; i<7; i++) {
        dates.push(addDays(weekStart, i));
    }
    return dates;
}

export function isWeekend(date = new Date()) {
  return isSaturday(date) || isSunday(date);
}
// Helper to get day safely
import { getDay } from 'date-fns';
