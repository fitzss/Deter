export const INTERVENTION_CONDITIONS = [
  {
    id: 'control',
    label: 'Control — no intervention',
    description: 'Measures the scenario without an active deterrence cue.',
  },
  {
    id: 'alarm',
    label: 'On-body alarm',
    description: 'Tests sound alone as the intervention.',
  },
  {
    id: 'light_voice',
    label: 'Light + recording warning',
    description: 'Tests visible attention and social exposure without elevation.',
  },
  {
    id: 'elevated_witness',
    label: 'Elevated stationary witness',
    description: 'Tests elevation and visible recording without flight.',
  },
  {
    id: 'flying_unit',
    label: 'Flying unit simulator',
    description: 'Represents the HALO hypothesis; no real hardware is controlled.',
  },
] as const;

export type InterventionCondition =
  (typeof INTERVENTION_CONDITIONS)[number]['id'];

export type DeviceState =
  | 'idle'
  | 'armed'
  | 'active'
  | 'resolved'
  | 'aborted'
  | 'fault';

export type TrialEventType =
  | 'TRIAL_CREATED'
  | 'ARMED'
  | 'TRIGGERED'
  | 'RECORDING_STARTED'
  | 'WARNING_PLAYED'
  | 'RESOLVED'
  | 'ABORTED'
  | 'FAULTED';

export interface TrialEvent {
  id: string;
  type: TrialEventType;
  at: string;
  atMs: number;
  detail?: string;
}

export interface TrialObservation {
  noticeLatencyMs: number | null;
  pauseDurationMs: number | null;
  separationFeet: number | null;
  activationLatencyMs: number | null;
  operatorLoad: 1 | 2 | 3 | 4 | 5;
  escalationObserved: boolean;
  notes: string;
}

export interface TrialRecord {
  id: string;
  createdAt: string;
  scenario: string;
  condition: InterventionCondition;
  finalState: Exclude<DeviceState, 'idle' | 'armed' | 'active'>;
  events: TrialEvent[];
  observation: TrialObservation;
}

export interface SimulatorState {
  trialId: string;
  state: DeviceState;
  createdAt: string;
  events: TrialEvent[];
}

export type SimulatorAction =
  | { type: 'ARM'; now?: number }
  | { type: 'TRIGGER'; condition: InterventionCondition; now?: number }
  | { type: 'RESOLVE'; detail?: string; now?: number }
  | { type: 'ABORT'; detail?: string; now?: number }
  | { type: 'FAULT'; detail: string; now?: number };

export const EMPTY_OBSERVATION: TrialObservation = {
  noticeLatencyMs: null,
  pauseDurationMs: null,
  separationFeet: null,
  activationLatencyMs: null,
  operatorLoad: 3,
  escalationObserved: false,
  notes: '',
};

export function createId(prefix: string): string {
  const random =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  return `${prefix}-${random}`;
}

export function createEvent(
  type: TrialEventType,
  now: number,
  detail?: string,
): TrialEvent {
  return {
    id: createId('event'),
    type,
    at: new Date(now).toISOString(),
    atMs: now,
    ...(detail ? { detail } : {}),
  };
}

export function createSimulatorState(now = Date.now()): SimulatorState {
  return {
    trialId: createId('trial'),
    state: 'idle',
    createdAt: new Date(now).toISOString(),
    events: [createEvent('TRIAL_CREATED', now, 'Simulation-only trial created.')],
  };
}

export function getCondition(
  id: InterventionCondition,
): (typeof INTERVENTION_CONDITIONS)[number] {
  return (
    INTERVENTION_CONDITIONS.find((condition) => condition.id === id) ??
    INTERVENTION_CONDITIONS[0]
  );
}
