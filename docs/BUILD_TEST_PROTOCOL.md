# HALO Reference Platform — Build and Test Protocol

## Purpose

This protocol defines the minimum safe, reproducible path from unopened parts to a characterized guarded reference aircraft.

It does not authorize public deployment or testing against unsuspecting people. Follow manufacturer instructions and stop when any step is unclear or unsafe.

## Roles

### Physical operator

The founder or another competent operator who is present with the hardware. This person controls power, batteries, propellers, physical assembly, and flight termination.

### Codex

Codex prepares instructions, code, checklists, data structures, and analysis. Codex cannot see or verify physical conditions unless the operator supplies evidence.

### Independent stop observer

Required once propellers are installed. This person watches the aircraft and test volume and can call an immediate stop without operating the primary controls.

## Universal stop conditions

Stop, disconnect power when safe, and log a fault if any of the following occurs:

- battery is swollen, punctured, leaking, unusually hot, or physically damaged;
- board, motor, connector, wire, deck, or charger is unusually hot;
- smoke, odor, arcing, or discoloration appears;
- motor output occurs unexpectedly;
- propeller or guard is cracked, bent, loose, or missing;
- aircraft does not respond to the expected stop command;
- communication is intermittent or state is ambiguous;
- uncontrolled drift, climb, oscillation, or contact occurs;
- a component loosens or shifts;
- a non-participant enters the test volume;
- the operator or observer is uncertain whether continuing is safe.

A stopped test is useful evidence. Do not hide it or rerun until the failure is understood.

## Stage A — Workspace preparation

- [ ] Clear a nonflammable bench.
- [ ] Remove loose conductive material.
- [ ] Prepare a LiPo-safe charging/storage location.
- [ ] Confirm an appropriate extinguisher and emergency procedure for the workspace.
- [ ] Wear eye protection during assembly and powered bench work.
- [ ] Prepare a parts tray and labels.
- [ ] Verify the digital scale and multimeter.
- [ ] Create the dated build log before opening parts.
- [ ] Confirm the operating-system account and repository branch.

Evidence:

- workspace photo or written inspection;
- tool list;
- build-log path.

## Stage B — Receipt and inventory

Do not connect a battery yet.

For every item:

1. Match manufacturer, part name, revision, SKU, and quantity to the order.
2. Photograph packaging and component condition when practical.
3. Inspect connectors, boards, motors, frame, guards, propellers, and batteries.
4. Record serial, lot, or visible revision.
5. Record return deadline.
6. Update `hardware/inventory.csv`.
7. Quarantine anything damaged or uncertain.

Evidence:

- completed inventory rows;
- condition notes;
- discrepancy/fault record if needed.

## Stage C — Mass baseline

Before assembly changes:

1. Verify scale resolution and zero.
2. Weigh the stock aircraft in the exact as-flown guarded configuration.
3. Weigh each deck, pin set, battery, and custom attachment separately.
4. Photograph or record each reading.
5. Update `hardware/weight_power_budget.csv` with actual values while preserving published values.

Do not overwrite manufacturer-published masses. Add measured rows or fields.

Evidence:

- scale and method;
- at least two repeated readings per item;
- final recorded value and spread.

## Stage D — Host and radio bring-up

Propellers remain removed.

1. Read the current official Bitcraze getting-started documentation.
2. Record host OS, architecture, Python version, USB details, and all installed tool versions.
3. Pin or record the exact client/library versions.
4. Connect Crazyradio 2.0 and verify host recognition.
5. Connect to the aircraft using the stock supported client.
6. Record firmware and hardware revision information.
7. Read battery voltage and basic telemetry.
8. Power-cycle and reconnect at least five times.
9. Save terminal output or screenshots in the build log.

Do not change firmware merely to make the repository look active. Establish the stock baseline first.

Pass requirement:

- five consecutive clean power-cycle/reconnect sequences;
- stable telemetry during each sequence;
- no unexplained reset or link loss.

## Stage E — Firmware baseline and recovery

Propellers remain removed.

1. Record the installed firmware version.
2. Identify the official firmware repository and release or commit corresponding to the device.
3. Document the supported update and recovery procedure.
4. Back up configuration where supported.
5. Update only if required by the official setup or a documented defect.
6. After any update, repeat Stage D.

Evidence:

- before/after version;
- source URL;
- exact commands or UI actions;
- recovery procedure;
- verification result.

## Stage F — Motor and stop-path bench check

Propellers remain removed.

Use only an upstream-supported motor-test or flight-client procedure.

1. Confirm visually and verbally that all propellers are removed.
2. Confirm aircraft restraint is not required by the official procedure; if restraint is used, ensure it cannot contact moving motor shafts.
3. Identify the stop/disarm control before enabling any output.
4. Test one bounded motor-output action at the lowest useful setting.
5. Observe direction, sound, vibration, telemetry, and stop response.
6. Repeat only as needed to verify all motors.
7. Disconnect the battery after the test.

Do not improvise raw motor values without understanding the upstream API and safety model.

Pass requirement:

- intended motor responds;
- no unintended motor output;
- stop command acts immediately and repeatedly;
- no abnormal sound, vibration, or heat.

## Stage G — Deck-by-deck bench integration

Propellers remain removed.

### Flow deck v2

- inspect orientation and connector engagement;
- confirm automatic detection;
- read range/flow telemetry;
- verify appropriate response over a matte surface;
- record lighting and surface limitations.

### Color LED deck

- verify top-mounted orientation;
- confirm automatic detection;
- begin at a low, steady brightness;
- test each intended color/state separately;
- measure or estimate current only using a safe, documented method;
- watch battery voltage and board temperature;
- define a conservative default setting.

Do not implement a flashing pattern intended to disorient or impair vision.

### Buzzer deck

- confirm automatic detection;
- use a short, conservative tone;
- record command duration and repetition;
- define a default cue that communicates state rather than maximizing discomfort.

### Combined stack

- draw and photograph the stack order;
- inspect full pin engagement and clearance;
- confirm every deck is detected;
- trigger each cue independently;
- trigger the intended combined cue;
- repeat connection and cue tests after five power cycles;
- log resets, bus conflicts, voltage sag, heat, or missed commands.

Pass requirement:

- all decks detected on every cycle;
- commands are deterministic;
- no reset, conflict, looseness, or overheating;
- stop/disarm path remains available.

## Stage H — Preflight inspection

Before every flight:

- [ ] Correct branch/software version recorded.
- [ ] Battery identifier recorded.
- [ ] Battery condition inspected.
- [ ] Battery start voltage recorded.
- [ ] Frame and motor mounts inspected.
- [ ] Propellers correct, undamaged, and secure.
- [ ] Guards installed and secure.
- [ ] Decks and pins fully seated.
- [ ] Payload attachment secure.
- [ ] Aircraft mass/configuration recorded.
- [ ] Radio link and telemetry verified.
- [ ] Emergency stop/disarm tested with props stationary.
- [ ] Flight volume clear.
- [ ] Matte floor and adequate lighting available for Flow deck.
- [ ] Operator and stop observer understand the run.
- [ ] No non-participant in or near the volume.
- [ ] Test objective and maximum duration stated.

## Stage I — Stock guarded hover

Do not install cue decks for the first hover series unless the manufacturer bundle requires them.

1. Install guards and stock propellers per official instructions.
2. Place aircraft at the center of the bounded volume.
3. Start telemetry capture.
4. Perform the lowest practical takeoff.
5. Hold a low stable hover briefly.
6. Land normally.
7. Inspect aircraft and record battery state.
8. Increase duration gradually only after clean runs.
9. Demonstrate the emergency stop in a deliberately low-risk, low-height test after ordinary flight is stable.

Pass requirement for G3:

- ten consecutive controlled takeoff-hover-land cycles;
- no unexplained communication or control fault;
- no damage;
- repeatable telemetry;
- baseline endurance measured separately after stability is established.

## Stage J — Payload flight ladder

Add one change per test series:

1. Flow deck stock configuration.
2. Flow + top Color LED deck, LED off.
3. Flow + top Color LED deck, conservative steady cue.
4. Flow + Buzzer deck, buzzer silent.
5. Flow + Buzzer deck, short conservative cue.
6. Flow + LED + Buzzer, cues off.
7. Flow + LED + Buzzer, intended combined cue.

For each configuration record:

- actual all-up mass;
- center-of-mass or balance observation;
- start/end voltage;
- hover stability;
- cue command success;
- resets or telemetry gaps;
- motor/board/battery temperature observation;
- flight duration;
- fault and recovery.

Do not advance after a failed series until the failure is understood.

## Stage K — Command-to-cue latency

Use synchronized software timestamps first. Add independent video or instrumentation later if software timestamps cannot capture the full chain.

Record:

- human input;
- host dispatch;
- radio send;
- aircraft acknowledgement if available;
- cue-on event;
- takeoff/hover events if part of the sequence;
- stop/disarm event;
- failure and retry.

Run enough repetitions to report distribution rather than a best case.

Initial minimum:

- 30 cue-only trials on the bench;
- 30 cue-only trials in stable hover;
- later, 30 scripted deploy/hover/cue sequences if the architecture supports it safely.

## Stage L — Human-involved staged tests

This stage is locked until G3–G5 pass.

Requirements:

- explicit consent;
- written script;
- bounded flight volume;
- prop guards;
- no target following or approach;
- independent stop observer;
- defined maximum cue settings;
- participant may stop at any time;
- no deceptive framing;
- no public or surprise testing;
- no inference that a participant is an attacker.

Use HALO Lab to record events and observations.

## Post-run procedure

After every powered test:

1. disarm and confirm motors stopped;
2. disconnect battery when appropriate;
3. inspect propellers, guards, motors, decks, connectors, and payload;
4. record end voltage and condition;
5. allow components to cool before charging;
6. save telemetry and logs with a stable run identifier;
7. update fault log before attempting a rerun;
8. commit repository changes when the record is complete.

## Evidence naming

Use:

```text
YYYY-MM-DD_gate_run-short-description
```

Examples:

```text
2026-09-02_G2_radio-reconnect-01
2026-09-05_G3_stock-hover-07
2026-09-11_G4_led-buzzer-hover-03
```

Raw evidence remains raw. Summaries link to it; they do not replace it.
