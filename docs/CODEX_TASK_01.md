# Codex Task 01 — Verify and Harden the Phase 0 Foundation

Use this task in **Code mode** against branch `codex/halo-lab-foundation`.

## Goal

Make the existing HALO Lab foundation installable, verified, and merge-ready without adding any real hardware control or expanding product scope.

## Instructions

1. Read `AGENTS.md`, `README.md`, and `docs/PHASE_0_PRODUCT_CONTRACT.md` before editing.
2. Inspect the entire repository and explain the current architecture briefly in your working notes.
3. Install dependencies and create the appropriate lockfile.
4. Run:

   ```bash
   npm run typecheck
   npm test
   npm run build
   ```

5. Fix every type, test, runtime, and build error. Do not suppress errors with `any`, broad casts, disabled strictness, or skipped tests.
6. Expand the state-machine test suite to cover at least:
   - arming twice is rejected;
   - triggering before arming is rejected;
   - resolving before activation is rejected;
   - aborting a terminal trial is rejected;
   - faulting from `idle`, `armed`, and `active` is allowed;
   - faulting a terminal trial is rejected;
   - activation latency is `null` until both arm and trigger events exist.
7. Review local-storage parsing. Malformed data must fail safely without crashing the application or silently becoming a valid trial. Keep missing metric values as `null`, never zero.
8. Run the application and inspect the complete workflow:
   - consent gate;
   - arm;
   - trigger each condition;
   - resolve or abort;
   - enter observations;
   - save;
   - refresh and confirm persistence;
   - export JSON.
9. Correct accessibility or responsive-layout defects you observe. The workflow must be keyboard usable and status must not depend on color alone.
10. Do not add APIs, authentication, a database, autonomous threat classification, person tracking, real drone commands, or new efficacy claims.

## Acceptance criteria

- `npm run typecheck`, `npm test`, and `npm run build` all pass.
- A lockfile is committed.
- All listed state transitions have explicit tests.
- Control trials emit no simulated warning or recording events.
- Flying-unit trials explicitly state that no hardware command is sent.
- Corrupt stored data cannot crash the app.
- No Phase 0 boundary in `AGENTS.md` is weakened.

## Completion report

Report:

- architecture found;
- files changed;
- defects found and fixed;
- commands run;
- test count and result;
- build result;
- manual workflow checks completed;
- remaining limitations;
- the next smallest evidence-building task.
