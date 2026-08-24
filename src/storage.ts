import type { TrialRecord } from './domain';

const STORAGE_KEY = 'deter.halo-lab.trials.v1';

export function loadTrials(): TrialRecord[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);
    return Array.isArray(parsed) ? (parsed as TrialRecord[]) : [];
  } catch {
    return [];
  }
}

export function persistTrials(trials: TrialRecord[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trials));
}

export function exportTrials(trials: TrialRecord[]): void {
  const payload = {
    schemaVersion: 1,
    exportedAt: new Date().toISOString(),
    product: 'Deter HALO Lab',
    scope: 'simulation-and-consented-staged-tests-only',
    trials,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `deter-halo-lab-${new Date()
    .toISOString()
    .replaceAll(':', '-')}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}
