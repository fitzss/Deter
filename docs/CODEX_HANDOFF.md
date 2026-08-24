# Codex Handoff — Deter / HALO V0

## What this repository is now

This repository is the permanent working memory and execution system for building Deter.

The project is no longer limited to a software simulator. Codex should help carry the program from concept through:

1. requirements;
2. hardware research;
3. procurement;
4. assembly;
5. firmware and host software;
6. bench bring-up;
7. guarded controlled flight;
8. cue integration;
9. latency and reliability testing;
10. consented staged mechanism comparisons;
11. iterative redesign;
12. the decision to build or not build a custom HALO platform.

The human founder performs purchases and physical work. Codex plans, researches, writes code, structures evidence, detects contradictions, and updates the repository after every material result.

## Core concept

Deter is investigating a user-triggered, non-contact intervention intended to create a short window in which a person can disengage before physical contact.

HALO is the proposed flying implementation. Its hypothesized advantages are:

- elevation and separation from the user;
- visible motion;
- a conspicuous third-party/witness effect;
- light and audio cues that are not dependent on the user's aim;
- the ability to produce timestamped telemetry and recordings;
- eventual docking, deployment, and coordination possibilities.

None of those advantages has yet been demonstrated against simpler alternatives.

## Current product question

> Can a small, guarded, user-triggered flying unit produce a reliable and measurable cue quickly enough to justify the complexity of flight?

The initial prototype is not expected to be pocket-ready, autonomous, or appropriate for real confrontations. It is a laboratory reference platform that lets the team learn which parts of the concept are physically and behaviorally real.

## Current status

Completed or available:

- historical pitch and product framing;
- initial HALO Lab software foundation;
- an explicit state machine and evidence model;
- current branch for the hardware program;
- GitHub issue #2 for the overall hardware program;
- GitHub issue #3 for Gate 1 procurement and bring-up.

Not yet completed:

- no confirmed hardware order;
- no received inventory;
- no verified flight-platform bring-up;
- no measured payload or power budget on actual hardware;
- no cue integration;
- no real latency, reliability, endurance, or mechanism-comparison evidence;
- no basis for a custom airframe or PCB.

## Selected branch

Use:

```text
codex/halo-hardware-program
```

Do not work from `main`. Do not create a second project scaffold. Read `AGENTS.md` before every substantial task.

## How the founder and Codex work together

### Codex owns

- current-source research and comparison tables;
- purchase recommendations and staged carts;
- the repository's bill of materials and budgets;
- reproducible software/firmware setup;
- test scripts, telemetry tools, and analysis code;
- checklists and acceptance criteria;
- turning physical observations into structured records;
- identifying what is not yet known;
- proposing the next smallest gated experiment.

### The founder owns

- approving spending;
- placing orders;
- confirming what arrived;
- photographing and inspecting physical parts;
- charging and handling batteries;
- assembling hardware;
- performing physical tests;
- supplying measurements, logs, screenshots, photos, video summaries, and failures;
- deciding whether to continue after each gate.

### Evidence protocol

Codex must distinguish:

- **manufacturer fact** — supported by a primary source;
- **design assumption** — used for planning but unverified;
- **user observation** — supplied from a physical step;
- **measured result** — numeric result with method and units;
- **inference** — interpretation of one or more observations;
- **decision** — a committed choice with rationale and reversal condition.

A result does not become `verified` merely because code compiled or a checklist was written.

## Immediate reference-platform strategy

The provisional Gate 1 platform is the Crazyflie 2.1 Brushless ecosystem because it provides:

- an open-source firmware and client ecosystem;
- prop guards;
- a published 40 g recommended stock payload;
- a published approximately 10-minute stock flight time;
- expansion decks for optical flow, light, audio, prototyping, positioning, and later sensors;
- Python control and telemetry through Crazyradio 2.0;
- a path from stock flight to custom deck electronics without beginning with a custom airframe.

This is a reference mule, not the final consumer form factor.

## Gate 1 spending rule

The first order should unlock only:

- stock guarded flight;
- position-aided indoor hover;
- low-latency host control and telemetry;
- a visible cue;
- an audible cue;
- basic custom payload prototyping;
- enough spares to recover from ordinary beginner damage.

Do not buy vision, Lighthouse, swarming, docking, custom PCB, custom airframe, or expensive fabrication equipment yet.

The current estimated official-store component subtotal is below $650 before shipping, tax, and generic battery-safety supplies. Recheck every price and stock status immediately before purchase.

## First Codex task

Execute:

```text
docs/CODEX_TASK_H0.md
```

The first task does not merely produce a shopping list. It must close the reference-platform decision, verify deck stacking and interfaces, update the weight/power budget, and create a founder-ready order sheet with explicit `BUY NOW`, `WAIT`, and `DO NOT BUY` sections.

## Physical test philosophy

Start with the least hazardous and most reversible state:

1. inventory and visual inspection;
2. battery and charger procedure;
3. props removed;
4. firmware/client connectivity;
5. telemetry and command checks;
6. LED and buzzer at conservative settings;
7. props installed with guards;
8. low hover in a bounded area;
9. repeatability and emergency stop;
10. payload added one item at a time;
11. only then user-trigger latency and scripted motion.

No human behavioral test occurs until the flight platform itself is reliable and the protocol has explicit consent and stop conditions.

## Current primary sources

Checked 2026-08-24:

- Crazyflie 2.1 Brushless specifications: https://www.bitcraze.io/products/crazyflie-2-1-brushless/
- Brushless STEM bundle: https://store.bitcraze.io/products/stem-bundle-crazyflie-2-1-brushless
- Flow deck v2: https://www.bitcraze.io/products/flow-deck-v2/
- Buzzer deck: https://www.bitcraze.io/products/buzzer-deck/
- Color LED deck: https://www.bitcraze.io/products/color-led-deck/
- Prototyping deck: https://www.bitcraze.io/products/prototyping-deck/
- FAA registration: https://www.faa.gov/uas/getting_started/register_drone
- FAA recreational flyers: https://www.faa.gov/uas/recreational_flyers
- FAA Part 107 overview: https://www.faa.gov/newsroom/small-unmanned-aircraft-systems-uas-regulations-part-107
- FAA indoor operations FAQ: https://www.faa.gov/faq/do-faa-rules-and-regulations-apply-commercial-uas-or-drone-operations-conducted-indoors-only

Recheck sources when facts may have changed.
