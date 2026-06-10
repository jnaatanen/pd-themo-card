import type { CardConfig, CardLayout, QuickAction } from './types';

export function parseConfig(raw: Partial<CardConfig> & { type: string }): CardConfig {
  if (raw.entities !== undefined) {
    if (!Array.isArray(raw.entities) || raw.entities.length === 0) {
      throw new Error("themo-card: 'entities' must be a non-empty list of climate entities");
    }
    for (const e of raw.entities) {
      if (typeof e !== 'string' || !e.startsWith('climate.')) {
        throw new Error(`themo-card: 'entities' must contain only climate.* (got ${e})`);
      }
    }
  }
  const step = raw.step ?? 0.5;
  if (typeof step !== 'number' || step <= 0) {
    throw new Error("themo-card: 'step' must be a positive number");
  }
  const quick_actions: QuickAction[] = raw.quick_actions ?? [];
  const layout: CardLayout = raw.layout ?? 'auto';
  if (layout !== 'auto' && layout !== 'desktop' && layout !== 'tablet' && layout !== 'mobile') {
    throw new Error("themo-card: 'layout' must be auto, desktop, tablet, or mobile");
  }
  return {
    type: raw.type,
    title: raw.title ?? 'Themo Heating',
    entities: raw.entities,
    default_zone: raw.default_zone,
    step,
    sun_entity: raw.sun_entity,
    energy: raw.energy,
    quick_actions,
    layout,
  };
}
