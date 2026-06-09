import type { HomeAssistant } from 'custom-card-helpers';
import type { QuickAction, ThemoMode } from './model/types';

export function setTemperature(hass: HomeAssistant, entityId: string, temperature: number) {
  return hass.callService('climate', 'set_temperature', { entity_id: entityId, temperature });
}
export function setMode(hass: HomeAssistant, entityId: string, hvac_mode: ThemoMode) {
  return hass.callService('climate', 'set_hvac_mode', { entity_id: entityId, hvac_mode });
}
export function setPreset(hass: HomeAssistant, entityId: string, preset_mode: string) {
  return hass.callService('climate', 'set_preset_mode', { entity_id: entityId, preset_mode });
}
export function toggleBacklight(hass: HomeAssistant, entityId: string, isOn: boolean) {
  return hass.callService('light', isOn ? 'turn_off' : 'turn_on', { entity_id: entityId });
}
export function runQuickAction(hass: HomeAssistant, action: QuickAction) {
  const [domain, service] = action.service.split('.', 2);
  return hass.callService(domain, service, action.service_data ?? {});
}
