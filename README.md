# Deter · HALO V0 Hardware Program

This repository is the working system for taking Deter from concept through hardware procurement, assembly, software and firmware, controlled flight, cue integration, measurement, and iteration.

The current objective is **not** to claim a finished personal-protection product. It is to build and characterize a guarded reference aircraft that can answer whether a user-triggered flying cue justifies the complexity of flight.

## Start here in Codex

Select repository `fitzss/Deter` and branch:

```text
codex/halo-hardware-program
```

Then ask Codex to execute:

```text
docs/CODEX_TASK_H0.md
```

Codex must read `AGENTS.md` first. The first task closes the reference-platform decision, verifies live component facts and compatibility, and creates a founder-ready Gate 1 order sheet. Codex does not place the order or claim physical verification.

## Current program state

- Historical Deter/HALO product framing is preserved.
- HALO Lab exists as a local evidence and experiment application.
- The hardware program has explicit gates from requirements through a custom-platform decision.
- A provisional Crazyflie 2.1 Brushless reference-platform cart has been prepared.
- The official-store component subtotal is currently estimated at $643.50 before shipping and tax.
- No hardware order or physical result is yet recorded.

## Immediate files

```text
AGENTS.md                         Codex's hardware-program instructions and boundaries
docs/CODEX_HANDOFF.md             Complete project context and working model
docs/CODEX_TASK_H0.md             First Codex procurement/architecture task
docs/HARDWARE_ROADMAP.md          Evidence gates and stop conditions
docs/PROCUREMENT_PLAN.md          Proposed first cart, deferred items, and rationale
docs/BUILD_TEST_PROTOCOL.md       Receipt, bench, hover, cue, and latency protocol
decisions/ADR-001-reference-platform.md
                                  Provisional platform decision and reversal conditions
hardware/bom.csv                  Candidate and proposed parts
hardware/weight_power_budget.csv  Published, estimated, and future measured budgets
hardware/inventory.csv            Only actual orders and received parts
logs/                             Battery, fault, build, and test evidence
templates/                        Build and test record templates
```

## Hardware strategy

The provisional first platform is the Crazyflie 2.1 Brushless ecosystem because it offers guarded low-energy flight, open firmware and host control, Python telemetry, expansion decks, a published 40 g recommended payload, and a roughly 10-minute stock flight time.

The planned Gate 1 configuration adds:

- Flow deck v2 for position-aided indoor hover;
- top-mounted Color LED deck for a visible cue;
- Buzzer deck for a short audible cue;
- Prototyping deck for later lightweight circuits;
- spare batteries, propellers, and guards.

This is a development mule, not the final HALO form factor.

## Program gates

```text
G0 requirements and reference-platform decision
G1 staged procurement and receipt
G2 propellers-off bench bring-up
G3 guarded controlled hover
G4 visible and audible cue integration
G5 command latency and reliability characterization
G6 consented staged mechanism comparison
G7 custom HALO decision
```

Do not skip gates. A document does not prove a physical result.

## Founder/Codex division of labor

Codex researches, compares, writes code, maintains the BOM and budgets, creates instructions, analyzes logs, and updates the repository.

The founder approves money, places orders, inspects and assembles parts, handles batteries, performs physical tests, and supplies measurements, photos, logs, and failures.

Codex must mark physical results **unverified** until that evidence exists.

## HALO Lab software

The existing React/TypeScript application remains useful for recording consented staged trials and preserving event timing and observations.

Run it locally with Node.js `^20.19.0` or `>=22.12.0`:

```bash
npm ci
npm run dev
```

Verify software changes with:

```bash
npm audit --audit-level=high
npm run typecheck
npm test
npm run build
```

## Boundaries

This program does not include autonomous threat classification, facial recognition, person targeting, pursuit, harmful or contact payloads, lasers, deliberately disorienting cues, public surprise testing, or claims of proven safety or deterrence.

Human-involved trials must be explicitly consented and staged. Early flight work should be indoors or in another legally authorized controlled area, with prop guards, a clear flight volume, and an independent stop observer once propellers are installed.

## Current decision

The next useful work is not another pitch deck and not a custom airframe. It is to complete `docs/CODEX_TASK_H0.md`, approve the smallest defensible Gate 1 cart, place the order, and then turn every physical result into repository evidence.
