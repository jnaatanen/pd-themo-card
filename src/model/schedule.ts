import type { Schedule, ScheduleData, NextChange, ZoneViewModel } from './types';

export function activeSchedule(data: ScheduleData | null): Schedule | null {
  if (!data) return null;
  return data.schedules.find((s) => s.active) ?? null;
}

// Forward-filled 24-hour temperature row for `day` (0=Sun..6=Sat). null if no setpoints that day.
export function todayRow(schedule: Schedule, day: number): (number | null)[] {
  const points = schedule.setpoints
    .filter((sp) => sp.day === day)
    .sort((x, y) => x.hour - y.hour);
  const row: (number | null)[] = new Array(24).fill(null);
  if (points.length === 0) return row;
  let current: number | null = null;
  let pi = 0;
  for (let h = 0; h < 24; h++) {
    while (pi < points.length && points[pi].hour === h) { current = points[pi].value; pi++; }
    row[h] = current;
  }
  return row;
}

export function nextChange(schedule: Schedule, day: number, hour: number): NextChange | null {
  const row = todayRow(schedule, day);
  const cur = row[hour];
  for (let h = hour + 1; h < 24; h++) {
    if (row[h] !== null && row[h] !== cur) return { hour: h, value: row[h] as number };
  }
  return null;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// "18:00" when `at` falls on the same local calendar day as `now`, else "Thu 06:00".
export function formatChangeTime(at: Date, now: Date): string {
  const hm = `${String(at.getHours()).padStart(2, '0')}:${String(at.getMinutes()).padStart(2, '0')}`;
  const sameDay = at.getFullYear() === now.getFullYear()
    && at.getMonth() === now.getMonth() && at.getDate() === now.getDate();
  return sameDay ? hm : `${WEEKDAYS[at.getDay()]} ${hm}`;
}

// "18:00 → 19°" from the 0.5.0 next-change sensor fields; null when either is missing.
export function nextChangeText(z: ZoneViewModel, now: Date = new Date()): string | null {
  if (z.nextChangeAt === null || z.nextChangeTemp === null) return null;
  return `${formatChangeTime(z.nextChangeAt, now)} → ${z.nextChangeTemp}°`;
}
