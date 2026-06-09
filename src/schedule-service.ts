import type { HomeAssistant } from 'custom-card-helpers';
import type { ScheduleData, Schedule } from './model/types';

export class ScheduleService {
  private cache = new Map<number, Promise<ScheduleData | null>>();

  get(hass: HomeAssistant, deviceId: number): Promise<ScheduleData | null> {
    const cached = this.cache.get(deviceId);
    if (cached) return cached;
    const p = this.fetch(hass, deviceId);
    this.cache.set(deviceId, p);
    return p;
  }

  invalidate(deviceId: number): void { this.cache.delete(deviceId); }

  private async fetch(hass: HomeAssistant, deviceId: number): Promise<ScheduleData | null> {
    try {
      const res = await hass.connection.sendMessagePromise<{ schedules: Schedule[] }>(
        { type: 'pd_hathemo/schedules', device_id: deviceId },
      );
      return { schedules: res.schedules };
    } catch {
      this.cache.delete(deviceId);  // allow a later retry
      return null;
    }
  }
}
