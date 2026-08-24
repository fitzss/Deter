# AGENTS.md — Deter

## Mission

Deter is testing whether a user-triggered, non-contact intervention can create a brief, measurable disengagement window before physical contact.

The current software is **HALO Lab**, an experiment simulator and evidence workspace. It does not claim to protect users and it does not control a physical device.

## Current phase: Phase 0

Build and validate the evidence workflow before any hardware integration.

The application must support:

1. A bounded staged scenario.
2. One intervention condition.
3. An operator-controlled state machine.
4. An append-only event ledger.
5. Human-entered observations.
6. Local persistence and JSON export.
7. Tests for every allowed and forbidden state transition.

## Non-negotiable boundaries

Do not add any of the following during Phase 0:

- autonomous threat identification or intent inference;
- facial recognition, person classification, or target selection;
- person tracking, pursuit, interception, or aiming;
- real drone, flight-controller, strobe, siren, camera, or actuator commands;
- functionality intended to blind, injure, shock, spray, strike, or make contact;
- public-surveillance ingestion or non-consensual test workflows;
- language claiming proven safety, protection, de-escalation, or deterrence efficacy.

All trials are synthetic or explicitly consented staged tests. Record observable behavior; do not label a participant an attacker or infer motive.

## Product discipline

The primary empirical question is:

> Does an elevated, visible intervention create materially more separation than simpler alternatives such as an alarm or light-and-voice warning?

The drone form factor is a hypothesis, not a requirement. Preserve comparison conditions and do not design the data model around a predetermined winning intervention.

## Engineering conventions

- Use strict TypeScript.
- Prefer pure domain functions and explicit state transitions.
- Fail closed on invalid transitions.
- Keep the event ledger append-only.
- Do not silently discard malformed or incomplete records.
- Keep Phase 0 local-first; no external API or network dependency is required.
- Keep components understandable. Do not introduce a framework, database, authentication system, or state-management library unless the task requires it.
- Preserve `Deterslide1.md` as a historical source document. Do not treat every claim in it as validated.

## Required checks

Before reporting completion, run:

```bash
npm run typecheck
npm test
npm run build
```

Fix every error introduced by the change. Report commands run, test results, build result, files changed, and remaining limitations.

## Definition of done for Phase 0 foundation

- A new contributor can install and run the project from `README.md`.
- The state machine rejects impossible transitions.
- Control trials do not emit simulated intervention outputs.
- Flying-unit trials are clearly labeled as simulations and never send hardware commands.
- A completed trial can be saved locally and exported as versioned JSON.
- The interface clearly separates automated event timestamps from human observations.
- The interface is keyboard usable, responsive, and understandable without color alone.
