export type ThemoMode = 'off' | 'heat' | 'auto';

export interface QuickAction {
  name: string;
  icon?: string;
  service: string;                 // e.g. "script.themo_boost"
  service_data?: Record<string, unknown>;
}

export interface EnergyConfig {
  today_entity?: string;
  cost_entity?: string;
  spot_entity?: string;
}

export interface CardConfig {
  type: string;
  title: string;                   // default "Themo Heating"
  entities?: string[];             // optional explicit climate list/order
  default_zone?: string;
  step: number;                    // setpoint step, default 0.5
  sun_entity?: string;
  energy?: EnergyConfig;
  quick_actions: QuickAction[];    // default []
}

export interface ZoneViewModel {
  climateEntityId: string;
  name: string;
  currentTemp: number | null;
  targetTemp: number | null;
  mode: ThemoMode;
  heating: boolean;
  minTemp: number;
  maxTemp: number;
  step: number;
  roomTemp: number | null;
  floorTemp: number | null;
  outsideTemp: number | null;
  heatingTodayPct: number | null;
  backlightEntityId: string | null;
  backlightOn: boolean | null;
  themoDeviceId: number | null;
  presetModes: string[];
  presetMode: string | null;
}

export interface ScheduleSetpoint { day: number; hour: number; value: number; } // day 0=Sun..6=Sat
export interface Schedule { id: number; name: string; active: boolean; setpoints: ScheduleSetpoint[]; }
export interface ScheduleData { schedules: Schedule[]; }

export interface NextChange { hour: number; value: number; }
