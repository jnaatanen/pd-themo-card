import type { Schedule, ScheduleData, NextChange } from './types';

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
