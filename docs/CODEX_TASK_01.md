# Codex Task 01 — Harden the Phase 0 Evidence Foundation

Use this task in **Code mode** starting from branch `codex/halo-lab-foundation`. Do not start from `main` and do not create a parallel scaffold.

## Goal

Turn the working HALO Lab foundation into a merge-ready evidence tool by expanding transition coverage, validating persisted records, and inspecting the complete browser workflow. Do not add physical-device control or broaden the product.

## Instructions

1. Read `AGENTS.md`, `README.md`, and `docs/PHASE_0_PRODUCT_CONTRACT.md` before editing. Treat their boundaries as authoritative.
2. Inspect the repository and summarize the current architecture briefly in your working notes.
3. Install the exact locked dependency set:

   ```bash
   npm ci
   ```

4. Establish the baseline by running:

   ```bash
   npm audit --audit-level=high
   npm run typecheck
   npm test
   npm run build
   ```

5. Preserve strict TypeScript and the current dependency boundary. Do not suppress errors with `any`, broad casts, disabled strictness, or skipped tests.
6. Expand the state-machine test suite to cover at least:
   - arming twice is rejected;
   - triggering before arming is rejected;
   - resolving before activation is rejected;
   - aborting a terminal trial is rejected;
   - faulting from `idle`, `armed`, and `active` is allowed;
   - faulting a terminal trial is rejected;
   - activation latency is `null` until both arm and trigger events exist;
   - a terminal state cannot transition to another terminal state;
   - control trials emit no recording or warning events;
   - flying-unit trials state explicitly that no hardware command was sent.
7. Harden local-storage parsing. Add explicit runtime validation for the exported/persisted schema rather than accepting any parsed array as `TrialRecord[]`.
   - Malformed records must be rejected or quarantined without crashing the app.
   - Unknown fields may be ignored, but required fields and enum values must be validated.
   - Missing metric values remain `null`, never zero.
   - Do not add a schema-validation package unless the hand-written validator becomes materially less clear.
8. Add focused tests for storage validation. Extract pure parsing/validation functions so they can run in the Node test environment without mocking the browser.
9. Run the application and inspect the complete workflow:
   - consent gate;
   - arm;
   - trigger every comparison condition;
   - resolve and abort paths;
   - enter observations;
   - save a record;
   - refresh and confirm persistence;
   - export JSON;
   - load the page at approximately 375 px, 768 px, and desktop width.
10. Fix accessibility, interaction, or responsive-layout defects you actually observe. The workflow must be keyboard usable and status must not depend on color alone.
11. Do not add APIs, authentication, a database, autonomous threat classification, person tracking, targeting, pursuit, real drone commands, payload controls, or efficacy claims.
12. Re-run all verification commands after the changes. Leave the repository cleaner than you found it, but do not refactor unrelated code.

## Acceptance criteria

- `npm ci` succeeds using the committed lockfile.
- `npm audit --audit-level=high` reports no high or critical vulnerabilities.
- `npm run typecheck`, `npm test`, and `npm run build` all pass.
- Every listed state transition has explicit tests.
- Persisted records are accepted only after runtime validation.
- Corrupt stored data cannot crash the app or silently become valid evidence.
- Control trials emit no simulated warning or recording events.
- Flying-unit trials explicitly state that no hardware command is sent.
- No Phase 0 boundary in `AGENTS.md` is weakened.

## Completion report

Report:

- architecture found;
- files changed;
- defects found and fixed;
- validation rules added;
- commands run;
- test count and result;
- audit and build results;
- browser workflow and viewport checks completed;
- remaining limitations;
- the next smallest evidence-building task.
