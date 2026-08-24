# AGENTS.md — Deter / HALO Hardware Program

## Mission

Deter is testing whether a user-triggered, non-contact intervention can create a brief, measurable disengagement window before physical contact.

This repository is now the operating system for the full HALO prototype program: product requirements, hardware research, procurement, firmware and software, assembly instructions, bench bring-up, flight tests, experiment records, failures, and iteration decisions.

The repository does **not** establish that Deter protects users or that a flying form factor is effective. Those are empirical questions.

## Current phase: H0 reference-platform program

The immediate objective is to select, buy, bring up, and characterize one open reference flight platform before designing a custom HALO airframe or PCB.

The provisional reference platform is the Crazyflie 2.1 Brushless ecosystem. It remains provisional until current availability, deck compatibility, payload margin, power budget, and total landed cost are recorded in the procurement decision.

## Codex's role

Codex should act as an exacting engineering collaborator and repository maintainer. It may:

- research current manufacturer specifications, prices, availability, documentation, and known constraints;
- compare candidate components and recommend a staged purchase;
- maintain the bill of materials, weight budget, power budget, inventory, build logs, test plans, and decision records;
- write and test host software, firmware changes, simulation tools, analysis scripts, and documentation;
- convert user-supplied measurements, photos, terminal output, and test observations into structured evidence;
- identify missing measurements, contradictions, unsafe assumptions, and premature claims;
- propose the next smallest physical experiment.

Codex cannot physically inspect, assemble, charge, arm, fly, or test hardware. It must never claim that a physical step passed without user-supplied evidence.

## Source-of-truth files

Keep these current as the program changes:

- `docs/CODEX_HANDOFF.md` — complete project context and operating workflow;
- `docs/HARDWARE_ROADMAP.md` — gates, milestones, and stop conditions;
- `docs/PROCUREMENT_PLAN.md` — current proposed purchase and rationale;
- `hardware/bom.csv` — candidate and approved parts;
- `hardware/weight_power_budget.csv` — mass and electrical budget;
- `hardware/inventory.csv` — only items actually ordered or received;
- `docs/BUILD_TEST_PROTOCOL.md` — physical bring-up and test sequence;
- `logs/` — build, battery, fault, and test records;
- `decisions/` — architecture and procurement decision records.

Do not let an answer in chat become the only record of a material decision. Update the repository.

## Program gates

1. **G0 — Requirements and reference-platform decision**
   - define the use case and measurable requirements;
   - verify current component facts from primary sources;
   - close the initial weight, power, compatibility, and cost estimates.
2. **G1 — Staged procurement**
   - prepare the Gate 1 cart;
   - obtain explicit human approval before any purchase;
   - record order details in `hardware/inventory.csv` only after the user confirms the order.
3. **G2 — Bench bring-up**
   - props removed;
   - inspect, update firmware, connect radio, read telemetry, test LEDs/audio at safe settings;
   - log every fault and recovery.
4. **G3 — Guarded controlled hover**
   - prop guards installed;
   - bounded indoor or otherwise legally authorized controlled test area;
   - no non-participants in the flight volume;
   - establish stable hover, emergency stop, battery behavior, and repeatability.
5. **G4 — Cue integration**
   - integrate a visible cue and audible announcement without exceeding weight/power/stability limits;
   - no harmful, laser, contact, or intentionally disorienting payload.
6. **G5 — Activation and reliability characterization**
   - measure user-command-to-output latency, failed activations, flight stability, endurance, and recovery behavior.
7. **G6 — Consented staged mechanism comparison**
   - compare the flying condition against simpler controls;
   - collect observable behavior, not inferred intent;
   - stop for any unsafe or agitating pattern.
8. **G7 — Custom HALO decision**
   - custom airframe, PCB, vision, dock, swarm, or larger purchase only after the preceding evidence supports it.

A later gate may not be treated as complete because a document exists. Completion requires the evidence named in that gate.

## Procurement discipline

For every recommended part, record:

- manufacturer and exact part/SKU;
- supplier URL;
- price and currency;
- availability and date checked;
- mass;
- voltage/current or power requirements;
- interface and compatibility assumptions;
- reason it is needed now;
- cheaper or simpler substitute;
- whether it is `candidate`, `approved`, `ordered`, `received`, `tested`, `rejected`, or `retired`.

Use manufacturer documentation and official stores as primary sources. Marketplace listings may be used only to locate stock and must be labeled as secondary. Recheck price and availability immediately before the user purchases.

Do not recommend a large cart merely because the full vision may eventually need it. Order only what unlocks the next gated test.

## Non-negotiable safety and scope boundaries

Do not create or integrate:

- autonomous threat identification, intent inference, facial recognition, person classification, or target selection;
- person tracking, pursuit, interception, aiming, or autonomous approach toward a person;
- functionality intended to blind, injure, shock, spray, strike, entangle, burn, or make contact;
- lasers or deliberately disorienting light/audio patterns;
- weapon payloads or instructions for adapting the platform into a weapon;
- surprise tests, public confrontations, or non-consensual recording workflows;
- language claiming proven protection, de-escalation, deterrence, or safety efficacy.

All human-involved trials must be explicitly consented and staged. Use prop guards and a controlled area. Record observable actions and uncertainty; do not label a participant an attacker or infer motive.

## Aviation and legal discipline

- Treat outdoor or non-recreational operation as a compliance question, not an assumption.
- Record aircraft mass including every attached component.
- Before outdoor testing, document the intended operating rule, registration and Remote ID status if applicable, airspace, visual-line-of-sight plan, participant status, and local/property permission.
- Indoor flight is preferred for early bring-up.
- Codex must flag legal uncertainty rather than inventing a conclusion.

## Engineering conventions

- Preserve strict TypeScript in the existing HALO Lab application.
- For flight-platform code, follow the upstream project's language, build system, style, and test practices.
- Prefer reversible configuration and minimal patches before firmware forks.
- Keep hardware interfaces behind explicit adapters; simulation and physical-device implementations must be distinguishable.
- Fail closed on invalid state transitions and communication faults.
- Never convert missing measurements into zero.
- Keep raw telemetry and observations separate from interpretations.
- Pin dependencies and record toolchain versions.
- Do not silently discard failed tests, damaged parts, malformed records, or contradictory measurements.
- Preserve `Deterslide1.md` as historical pitch material, not validated product truth.

## Required completion report for every task

Report:

- objective and gate served;
- sources and assumptions;
- files changed;
- code commands and tests run;
- hardware actions the user must perform;
- evidence received from the user;
- pass/fail status for each acceptance criterion;
- unresolved risks and contradictions;
- money committed and remaining gate budget;
- next smallest task.

If no physical evidence was supplied, say that the hardware result is **unverified**.
