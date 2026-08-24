import { describe, expect, it } from 'vitest';
import { createSimulatorState } from './domain';
import {
  deriveActivationLatencyMs,
  InvalidTransitionError,
  isTerminalState,
  simulatorReducer,
} from './simulator';

describe('HALO simulator state machine', () => {
  it('runs an operator-controlled flying-unit simulation', () => {
    const initial = createSimulatorState(1_000);
    const armed = simulatorReducer(initial, { type: 'ARM', now: 2_000 });
    const active = simulatorReducer(armed, {
      type: 'TRIGGER',
      condition: 'flying_unit',
      now: 2_750,
    });
    const resolved = simulatorReducer(active, {
      type: 'RESOLVE',
      now: 5_000,
    });

    expect(armed.state).toBe('armed');
    expect(active.state).toBe('active');
    expect(resolved.state).toBe('resolved');
    expect(active.events.map((event) => event.type)).toEqual([
      'TRIAL_CREATED',
      'ARMED',
      'TRIGGERED',
      'RECORDING_STARTED',
      'WARNING_PLAYED',
    ]);
    expect(
      active.events.find((event) => event.type === 'WARNING_PLAYED')?.detail,
    ).toContain('no hardware command sent');
    expect(deriveActivationLatencyMs(resolved.events)).toBe(750);
    expect(isTerminalState(resolved.state)).toBe(true);
  });

  it('keeps the control condition free of simulated output events', () => {
    const armed = simulatorReducer(createSimulatorState(1_000), {
      type: 'ARM',
      now: 1_500,
    });
    const active = simulatorReducer(armed, {
      type: 'TRIGGER',
      condition: 'control',
      now: 2_000,
    });

    expect(active.events.map((event) => event.type)).toEqual([
      'TRIAL_CREATED',
      'ARMED',
      'TRIGGERED',
    ]);
  });

  it('allows an armed trial to be aborted', () => {
    const armed = simulatorReducer(createSimulatorState(1_000), {
      type: 'ARM',
      now: 1_100,
    });
    const aborted = simulatorReducer(armed, {
      type: 'ABORT',
      detail: 'Consent withdrawn.',
      now: 1_200,
    });

    expect(aborted.state).toBe('aborted');
    expect(aborted.events.at(-1)?.detail).toBe('Consent withdrawn.');
  });

  it('fails closed on invalid transitions', () => {
    const initial = createSimulatorState(1_000);

    expect(() =>
      simulatorReducer(initial, {
        type: 'TRIGGER',
        condition: 'alarm',
        now: 1_100,
      }),
    ).toThrow(InvalidTransitionError);
  });
});
