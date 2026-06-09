import type { HomeAssistant } from 'custom-card-helpers';
import type { ThemoMode, ZoneViewModel } from './types';

// Ring geometry matches desktop.html: r=84 -> circumference ~= 528.
export const RING_RADIUS = 84;
export const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export function ringOffset(temp: number | null, min: number, max: number): number {
  if (temp === null || max <= min) return RING_CIRCUMFERENCE;
  const frac = Math.min(1, Math.max(0, (temp - min) / (max - min)));
  return RING_CIRCUMFERENCE * (1 - frac);
}

export function clampSetpoint(value: number, min: number, max: number, step: number): number {
  const rounded = Math.round(value / step) * step;
  const clamped = Math.min(max, Math.max(min, rounded));
  // Round to the step's decimal precision to kill FP noise (e.g. 21.200000000000003).
  const decimals = (String(step).split('.')[1] || '').length;
  return Number(clamped.toFixed(decimals));
}

export function resolveThemoDeviceId(hass: HomeAssistant, climateEntityId: string): number | null {
  const ent = (hass as any).entities?.[climateEntityId];
  const deviceId = ent?.device_id;
  if (!deviceId) return null;
  const device = (hass as any).devices?.[deviceId];
  const identifiers: [string, string][] = device?.identifiers ?? [];
  for (const pair of identifiers) {
    if (pair[0] === 'pd_hathemo') {
      const n = parseInt(pair[1], 10);
      return Number.isNaN(n) ? null : n;
    }
  }
  return null;
}

const HA_MODE: Record<string, ThemoMode> = { off: 'off', heat: 'heat', auto: 'auto' };

function num(v: unknown): number | null {
  if (v === null || v === undefined || v === '' || v === 'unknown' || v === 'unavailable') return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}

export function discoverZones(hass: HomeAssistant, configured: string[] | undefined): string[] {
  if (configured) return configured;
  const entities = (hass as any).entities ?? {};
  return Object.keys(entities)
    .filter((id) => id.startsWith('climate.') && entities[id]?.platform === 'pd_hathemo')
    .sort();
}

// Resolve a sibling entity in `domain` on the same device whose entity_id contains `needle`.
// When `exact` is true, the entity id must end with `_<needle>` instead of merely containing `needle`.
function sibling(hass: HomeAssistant, deviceId: string | undefined, domain: string, needle: string, exact = false): string | null {
  if (!deviceId) return null;
  const entities = (hass as any).entities ?? {};
  for (const id of Object.keys(entities)) {
    if (entities[id]?.device_id === deviceId && id.startsWith(domain + '.')) {
      const matches = exact ? id.endsWith('_' + needle) : id.includes(needle);
      if (matches) return id;
    }
  }
  return null;
}

export function buildZoneViewModel(
  hass: HomeAssistant, climateEntityId: string, step: number,
): ZoneViewModel | null {
  const st = hass.states[climateEntityId];
  if (!st) return null;
  const a = st.attributes as Record<string, any>;
  const deviceId = (hass as any).entities?.[climateEntityId]?.device_id as string | undefined;

  const roomId = sibling(hass, deviceId, 'sensor', 'room_temperature');
  const floorId = sibling(hass, deviceId, 'sensor', 'floor_temperature');
  const outsideId = sibling(hass, deviceId, 'sensor', 'outside_temperature');
  const heatingId = sibling(hass, deviceId, 'binary_sensor', 'heating');
  const backlightId = sibling(hass, deviceId, 'light', 'backlight');
  const todayId = sibling(hass, deviceId, 'sensor', 'heating_today', true);

  const stateOf = (id: string | null) => (id ? hass.states[id] : undefined);

  return {
    climateEntityId,
    name: a.friendly_name ?? climateEntityId,
    currentTemp: num(a.current_temperature),
    targetTemp: num(a.temperature),
    mode: HA_MODE[st.state] ?? 'off',
    heating: (a.hvac_action ?? (stateOf(heatingId)?.state)) === 'heating' || stateOf(heatingId)?.state === 'on',
    minTemp: num(a.min_temp) ?? 5,
    maxTemp: num(a.max_temp) ?? 35,
    step: num(a.target_temp_step) ?? step,
    roomTemp: num(stateOf(roomId)?.state),
    floorTemp: num(stateOf(floorId)?.state),
    outsideTemp: num(stateOf(outsideId)?.state),
    heatingTodayPct: num(stateOf(todayId)?.state),
    backlightEntityId: backlightId,
    backlightOn: backlightId ? stateOf(backlightId)?.state === 'on' : null,
    themoDeviceId: resolveThemoDeviceId(hass, climateEntityId),
    presetModes: Array.isArray(a.preset_modes) ? a.preset_modes : [],
    presetMode: a.preset_mode ?? null,
  };
}
