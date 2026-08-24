import { useEffect, useMemo, useState } from 'react';
import {
  EMPTY_OBSERVATION,
  INTERVENTION_CONDITIONS,
  createSimulatorState,
  getCondition,
  type InterventionCondition,
  type SimulatorAction,
  type TrialEventType,
  type TrialObservation,
  type TrialRecord,
} from './domain';
import {
  deriveActivationLatencyMs,
  isTerminalState,
  simulatorReducer,
} from './simulator';
import { exportTrials, loadTrials, persistTrials } from './storage';

const EVENT_LABELS: Record<TrialEventType, string> = {
  TRIAL_CREATED: 'Trial created',
  ARMED: 'Operator armed',
  TRIGGERED: 'Intervention triggered',
  RECORDING_STARTED: 'Recording indicator',
  WARNING_PLAYED: 'Warning cue',
  RESOLVED: 'Encounter resolved',
  ABORTED: 'Trial aborted',
  FAULTED: 'Simulated fault',
};

function nullableNumber(value: string): number | null {
  if (value.trim() === '') {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function average(values: Array<number | null>): number | null {
  const present = values.filter((value): value is number => value !== null);
  if (present.length === 0) {
    return null;
  }

  return present.reduce((sum, value) => sum + value, 0) / present.length;
}

function formatMetric(value: number | null, suffix: string): string {
  return value === null ? '—' : `${Math.round(value * 10) / 10}${suffix}`;
}

export default function App() {
  const [simulator, setSimulator] = useState(() => createSimulatorState());
  const [condition, setCondition] =
    useState<InterventionCondition>('control');
  const [scenario, setScenario] = useState(
    'Private parking-lot walk from workplace to vehicle',
  );
  const [consentConfirmed, setConsentConfirmed] = useState(false);
  const [observation, setObservation] =
    useState<TrialObservation>(EMPTY_OBSERVATION);
  const [trials, setTrials] = useState<TrialRecord[]>(() => loadTrials());
  const [error, setError] = useState<string | null>(null);
  const [savedCurrent, setSavedCurrent] = useState(false);

  useEffect(() => {
    persistTrials(trials);
  }, [trials]);

  const selectedCondition = getCondition(condition);
  const terminal = isTerminalState(simulator.state);
  const activationLatency = deriveActivationLatencyMs(simulator.events);
  const canArm =
    simulator.state === 'idle' &&
    consentConfirmed &&
    scenario.trim().length >= 8;

  const resolvedTrials = trials.filter(
    (trial) => trial.finalState === 'resolved',
  );
  const summary = useMemo(
    () => ({
      pause: average(
        resolvedTrials.map((trial) => trial.observation.pauseDurationMs),
      ),
      separation: average(
        resolvedTrials.map((trial) => trial.observation.separationFeet),
      ),
      activation: average(
        resolvedTrials.map((trial) => trial.observation.activationLatencyMs),
      ),
      escalationCount: resolvedTrials.filter(
        (trial) => trial.observation.escalationObserved,
      ).length,
    }),
    [resolvedTrials],
  );

  function applyAction(action: SimulatorAction): void {
    try {
      setSimulator(simulatorReducer(simulator, action));
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unknown simulator error.');
    }
  }

  function startNewTrial(): void {
    setSimulator(createSimulatorState());
    setObservation(EMPTY_OBSERVATION);
    setConsentConfirmed(false);
    setSavedCurrent(false);
    setError(null);
  }

  function saveTrial(): void {
    const finalState = simulator.state;
    if (!isTerminalState(finalState) || savedCurrent) {
      return;
    }

    const record: TrialRecord = {
      id: simulator.trialId,
      createdAt: simulator.createdAt,
      scenario: scenario.trim(),
      condition,
      finalState,
      events: simulator.events,
      observation: {
        ...observation,
        activationLatencyMs: activationLatency,
      },
    };

    setTrials((current) => [record, ...current]);
    setSavedCurrent(true);
  }

  function removeTrial(id: string): void {
    setTrials((current) => current.filter((trial) => trial.id !== id));
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Deter · Phase 0</p>
          <h1>HALO Lab</h1>
          <p className="subtitle">
            A simulation and evidence workspace for measuring pre-contact
            interruption—not a protection claim or flight-control system.
          </p>
        </div>
        <div className={`state-pill state-${simulator.state}`}>
          <span className="state-dot" aria-hidden="true" />
          {simulator.state.toUpperCase()}
        </div>
      </header>

      <aside className="safety-banner" aria-label="Prototype safety boundary">
        <strong>Current boundary:</strong> synthetic or explicitly consented staged
        trials only. No autonomous threat classification, person targeting,
        pursuit, high-intensity output control, or real hardware commands.
      </aside>

      <section className="metric-grid" aria-label="Saved trial summary">
        <article className="metric-card">
          <span>Resolved trials</span>
          <strong>{resolvedTrials.length}</strong>
        </article>
        <article className="metric-card">
          <span>Mean pause</span>
          <strong>{formatMetric(summary.pause, ' ms')}</strong>
        </article>
        <article className="metric-card">
          <span>Mean separation</span>
          <strong>{formatMetric(summary.separation, ' ft')}</strong>
        </article>
        <article className="metric-card">
          <span>Mean activation</span>
          <strong>{formatMetric(summary.activation, ' ms')}</strong>
        </article>
        <article className="metric-card">
          <span>Escalation flags</span>
          <strong>{summary.escalationCount}</strong>
        </article>
      </section>

      <main className="workspace-grid">
        <section className="panel protocol-panel">
          <div className="panel-heading">
            <div>
              <p className="section-number">01</p>
              <h2>Protocol</h2>
            </div>
            <span className="quiet-label">Operator controlled</span>
          </div>

          <label>
            Scenario
            <textarea
              value={scenario}
              onChange={(event) => setScenario(event.target.value)}
              disabled={simulator.state !== 'idle'}
              rows={3}
              placeholder="Describe one bounded, staged scenario."
            />
          </label>

          <label>
            Intervention condition
            <select
              value={condition}
              onChange={(event) =>
                setCondition(event.target.value as InterventionCondition)
              }
              disabled={simulator.state !== 'idle'}
            >
              {INTERVENTION_CONDITIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <p className="condition-description">{selectedCondition.description}</p>

          <label className="consent-check">
            <input
              type="checkbox"
              checked={consentConfirmed}
              onChange={(event) => setConsentConfirmed(event.target.checked)}
              disabled={simulator.state !== 'idle'}
            />
            <span>
              I confirm this is synthetic or every participant explicitly
              consented to this staged trial.
            </span>
          </label>

          <div className="control-grid">
            <button
              className="primary"
              type="button"
              disabled={!canArm}
              onClick={() => applyAction({ type: 'ARM' })}
            >
              Arm trial
            </button>
            <button
              className="danger"
              type="button"
              disabled={simulator.state !== 'armed'}
              onClick={() => applyAction({ type: 'TRIGGER', condition })}
            >
              {condition === 'control' ? 'Start observation' : 'Trigger simulation'}
            </button>
            <button
              type="button"
              disabled={simulator.state !== 'active'}
              onClick={() => applyAction({ type: 'RESOLVE' })}
            >
              Mark resolved
            </button>
            <button
              type="button"
              disabled={
                simulator.state !== 'armed' && simulator.state !== 'active'
              }
              onClick={() =>
                applyAction({ type: 'ABORT', detail: 'Operator ended the trial.' })
              }
            >
              Abort
            </button>
          </div>

          {error ? <p className="error-message">{error}</p> : null}

          <div className="trial-meta">
            <span>Trial ID</span>
            <code>{simulator.trialId}</code>
          </div>
        </section>

        <section className="panel timeline-panel">
          <div className="panel-heading">
            <div>
              <p className="section-number">02</p>
              <h2>Event ledger</h2>
            </div>
            <span className="quiet-label">Append only</span>
          </div>

          <ol className="timeline">
            {simulator.events.map((event) => (
              <li key={event.id}>
                <span className="timeline-marker" aria-hidden="true" />
                <div>
                  <div className="event-title-row">
                    <strong>{EVENT_LABELS[event.type]}</strong>
                    <time dateTime={event.at}>
                      {new Date(event.at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </time>
                  </div>
                  {event.detail ? <p>{event.detail}</p> : null}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="panel observation-panel">
          <div className="panel-heading">
            <div>
              <p className="section-number">03</p>
              <h2>Observed outcome</h2>
            </div>
            <span className="quiet-label">Human entered</span>
          </div>

          <div className="field-grid">
            <label>
              Notice latency (ms)
              <input
                type="number"
                min="0"
                value={observation.noticeLatencyMs ?? ''}
                onChange={(event) =>
                  setObservation((current) => ({
                    ...current,
                    noticeLatencyMs: nullableNumber(event.target.value),
                  }))
                }
              />
            </label>
            <label>
              Pause duration (ms)
              <input
                type="number"
                min="0"
                value={observation.pauseDurationMs ?? ''}
                onChange={(event) =>
                  setObservation((current) => ({
                    ...current,
                    pauseDurationMs: nullableNumber(event.target.value),
                  }))
                }
              />
            </label>
            <label>
              Separation gained (ft)
              <input
                type="number"
                min="0"
                step="0.5"
                value={observation.separationFeet ?? ''}
                onChange={(event) =>
                  setObservation((current) => ({
                    ...current,
                    separationFeet: nullableNumber(event.target.value),
                  }))
                }
              />
            </label>
            <label>
              Activation latency (automatic)
              <input
                type="text"
                value={formatMetric(activationLatency, ' ms')}
                readOnly
              />
            </label>
            <label>
              Operator cognitive load
              <select
                value={observation.operatorLoad}
                onChange={(event) =>
                  setObservation((current) => ({
                    ...current,
                    operatorLoad: Number(event.target.value) as 1 | 2 | 3 | 4 | 5,
                  }))
                }
              >
                <option value="1">1 — very low</option>
                <option value="2">2 — low</option>
                <option value="3">3 — moderate</option>
                <option value="4">4 — high</option>
                <option value="5">5 — very high</option>
              </select>
            </label>
            <label className="escalation-check">
              <input
                type="checkbox"
                checked={observation.escalationObserved}
                onChange={(event) =>
                  setObservation((current) => ({
                    ...current,
                    escalationObserved: event.target.checked,
                  }))
                }
              />
              <span>Escalation or agitation observed</span>
            </label>
          </div>

          <label>
            Notes
            <textarea
              rows={4}
              value={observation.notes}
              onChange={(event) =>
                setObservation((current) => ({
                  ...current,
                  notes: event.target.value,
                }))
              }
              placeholder="Record observable behavior and uncertainty; do not infer intent."
            />
          </label>

          <div className="record-actions">
            <button
              className="primary"
              type="button"
              disabled={!terminal || savedCurrent}
              onClick={saveTrial}
            >
              {savedCurrent ? 'Trial saved' : 'Save trial record'}
            </button>
            <button type="button" disabled={!terminal} onClick={startNewTrial}>
              New trial
            </button>
          </div>
        </section>

        <section className="panel records-panel">
          <div className="panel-heading">
            <div>
              <p className="section-number">04</p>
              <h2>Evidence records</h2>
            </div>
            <button
              className="compact-button"
              type="button"
              disabled={trials.length === 0}
              onClick={() => exportTrials(trials)}
            >
              Export JSON
            </button>
          </div>

          {trials.length === 0 ? (
            <div className="empty-state">
              No saved trials. Finish and record one staged simulation to begin the
              evidence set.
            </div>
          ) : (
            <div className="records-list">
              {trials.map((trial) => (
                <article key={trial.id} className="record-card">
                  <div>
                    <div className="record-title-row">
                      <strong>{getCondition(trial.condition).label}</strong>
                      <span className={`record-state state-${trial.finalState}`}>
                        {trial.finalState}
                      </span>
                    </div>
                    <p>{trial.scenario}</p>
                    <dl>
                      <div>
                        <dt>Pause</dt>
                        <dd>
                          {formatMetric(trial.observation.pauseDurationMs, ' ms')}
                        </dd>
                      </div>
                      <div>
                        <dt>Separation</dt>
                        <dd>
                          {formatMetric(trial.observation.separationFeet, ' ft')}
                        </dd>
                      </div>
                      <div>
                        <dt>Activation</dt>
                        <dd>
                          {formatMetric(
                            trial.observation.activationLatencyMs,
                            ' ms',
                          )}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <button
                    className="text-button"
                    type="button"
                    onClick={() => removeTrial(trial.id)}
                    aria-label={`Delete trial ${trial.id}`}
                  >
                    Delete
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
