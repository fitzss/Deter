# Deter · HALO Lab

HALO Lab is the Phase 0 software foundation for Deter: a local-first simulator and evidence workspace for testing whether a user-triggered, non-contact intervention can create a measurable disengagement window before physical contact.

It is **not** a flight controller, autonomous threat detector, weapon, or validated personal-protection product.

## Why this is the first build

Deter's most valuable hypothesis is not simply that a small drone can fly. It is that an elevated, visible witness may alter a staged approach enough to create additional time and distance for disengagement.

Before custom hardware, HALO Lab must make that claim falsifiable by comparing:

- no intervention;
- an on-body alarm;
- light plus a recording warning;
- an elevated stationary witness; and
- a simulated flying unit.

## Current capabilities

- Operator-controlled trial state machine.
- Explicit consent gate for staged tests.
- Append-only event timeline.
- Separate human observation fields.
- Automatic activation-latency calculation.
- Local browser persistence.
- Versioned JSON export.
- Summary metrics across resolved trials.
- Unit tests for valid and invalid state transitions.

## Run locally

Requirements: Node.js 18.18 or newer.

```bash
npm install
npm run dev
```

Then open the local address printed by Vite.

## Verify the project

```bash
npm run typecheck
npm test
npm run build
```

## Repository map

```text
AGENTS.md                    Codex and contributor operating constraints
Deterslide1.md               Historical pitch material; claims are not validated
src/domain.ts                Trial types, conditions, events, and factories
src/simulator.ts             Fail-closed state machine and derived metrics
src/simulator.test.ts        State-machine tests
src/storage.ts               Local persistence and versioned JSON export
src/App.tsx                  Operator and evidence interface
src/styles.css               Responsive visual system
docs/PHASE_0_PRODUCT_CONTRACT.md
                             Product question, metrics, exclusions, and gates
docs/CODEX_TASK_01.md        First task to run in Codex
```

## Phase 0 state model

```text
idle → armed → active → resolved
           ↘ aborted
idle/armed/active → fault
```

Invalid transitions fail closed. A control trial records its trigger marker but does not create simulated recording or warning events.

## Data boundary

Trial data remains in the browser unless the operator exports it. Phase 0 makes no external API calls and has no authentication or cloud database.

All tests must be synthetic or explicitly consented and staged. Notes should record observable actions and uncertainty rather than infer intent.

## Next decision

Do not connect hardware merely because the dashboard works. First use HALO Lab to determine whether the flying or elevated condition adds meaningful separation over simpler interventions. Hardware earns its place only if the comparison data supports it.
