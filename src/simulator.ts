import {
  createEvent,
  type InterventionCondition,
  type SimulatorAction,
  type SimulatorState,
  type TrialEvent,
} from './domain';

export class InvalidTransitionError extends Error {
  constructor(state: SimulatorState['state'], action: SimulatorAction['type']) {
    super(`Cannot apply ${action} while simulator is ${state}.`);
    this.name = 'InvalidTransitionError';
  }
}

function appendEvents(
  state: SimulatorState,
  nextState: SimulatorState['state'],
  events: TrialEvent[],
): SimulatorState {
  return {
    ...state,
    state: nextState,
    events: [...state.events, ...events],
  };
}

function triggerEvents(
  condition: InterventionCondition,
  now: number,
): TrialEvent[] {
  const events: TrialEvent[] = [
    createEvent('TRIGGERED', now, `Condition: ${condition}`),
  ];

  if (condition === 'control') {
    return events;
  }

  if (
    condition === 'light_voice' ||
    condition === 'elevated_witness' ||
    condition === 'flying_unit'
  ) {
    events.push(
      createEvent(
        'RECORDING_STARTED',
        now + 1,
        'Simulated recording indicator activated.',
      ),
    );
  }

  const warningDetail =
    condition === 'alarm'
      ? 'Simulated on-body alarm activated.'
      : condition === 'flying_unit'
        ? 'Simulated elevated light and recording warning activated; no hardware command sent.'
        : 'Simulated light and recording warning activated.';

  events.push(createEvent('WARNING_PLAYED', now + 2, warningDetail));
  return events;
}

export function simulatorReducer(
  state: SimulatorState,
  action: SimulatorAction,
): SimulatorState {
  const now = action.now ?? Date.now();

  switch (action.type) {
    case 'ARM':
      if (state.state !== 'idle') {
        throw new InvalidTransitionError(state.state, action.type);
      }

      return appendEvents(state, 'armed', [
        createEvent('ARMED', now, 'Operator armed the simulated trial.'),
      ]);

    case 'TRIGGER':
      if (state.state !== 'armed') {
        throw new InvalidTransitionError(state.state, action.type);
      }

      return appendEvents(state, 'active', triggerEvents(action.condition, now));

    case 'RESOLVE':
      if (state.state !== 'active') {
        throw new InvalidTransitionError(state.state, action.type);
      }

      return appendEvents(state, 'resolved', [
        createEvent(
          'RESOLVED',
          now,
          action.detail ?? 'Operator marked the staged encounter resolved.',
        ),
      ]);

    case 'ABORT':
      if (state.state !== 'armed' && state.state !== 'active') {
        throw new InvalidTransitionError(state.state, action.type);
      }

      return appendEvents(state, 'aborted', [
        createEvent(
          'ABORTED',
          now,
          action.detail ?? 'Operator aborted the simulated trial.',
        ),
      ]);

    case 'FAULT':
      if (
        state.state === 'resolved' ||
        state.state === 'aborted' ||
        state.state === 'fault'
      ) {
        throw new InvalidTransitionError(state.state, action.type);
      }

      return appendEvents(state, 'fault', [
        createEvent('FAULTED', now, action.detail),
      ]);
  }
}

export function isTerminalState(
  state: SimulatorState['state'],
): state is 'resolved' | 'aborted' | 'fault' {
  return state === 'resolved' || state === 'aborted' || state === 'fault';
}

export function deriveActivationLatencyMs(
  events: TrialEvent[],
): number | null {
  const armed = events.find((event) => event.type === 'ARMED');
  const triggered = events.find((event) => event.type === 'TRIGGERED');

  if (!armed || !triggered) {
    return null;
  }

  return Math.max(0, triggered.atMs - armed.atMs);
}
