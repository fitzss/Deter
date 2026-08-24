# HALO V0 Hardware Roadmap

## Program objective

Build enough physical capability to determine whether a small user-triggered flying unit deserves to become a custom product.

The roadmap is evidence-gated. Later-stage ambition is not evidence that an earlier stage passed.

## North-star measurements

The hardware program should ultimately measure:

- command-to-cue latency;
- command success rate;
- stable-hover success rate;
- endurance with each payload configuration;
- effective cue visibility and audibility at bounded safe settings;
- separation or pause lift versus simpler non-flying conditions in consented staged trials;
- user cognitive load and activation errors;
- fault frequency and safe recovery behavior;
- actual carry/deployment feasibility of later prototypes.

## G0 — Requirements and reference-platform decision

### Goal

Close the first architecture and purchasing decision without ordering speculative future-stage hardware.

### Required outputs

- exact initial use case;
- reference-platform comparison;
- official-source specifications and prices;
- deck compatibility and stack plan;
- initial weight and power budget;
- approved Gate 1 cart;
- rejected and deferred items;
- spending cap;
- risk register.

### Pass criteria

- one platform selected for a clearly stated reason;
- no unresolved compatibility assumption that could make the entire order unusable;
- estimated attached mass remains inside the manufacturer's recommended payload margin;
- every Gate 1 item unlocks a named test;
- founder explicitly approves the cart and cap.

### Stop conditions

- reference platform unavailable with no credible substitute;
- required cue or control interfaces cannot coexist;
- estimated payload or power margin is inadequate;
- total Gate 1 cost exceeds the approved cap without a new decision.

## G1 — Procurement and receipt

### Goal

Buy only the parts needed for bring-up and first cue integration.

### Required outputs

- purchase record with date, supplier, SKU, quantity, unit price, shipping, tax, and order number;
- inventory records after receipt;
- photos or inspection notes for received components;
- missing/damaged/wrong-item report;
- warranty and return deadlines.

### Pass criteria

- all critical items received and visually inspected;
- no damaged battery or airframe component enters testing;
- inventory matches order records;
- tooling and safe charging/storage setup are available.

### Stop conditions

- swollen, punctured, hot, damaged, or suspect LiPo battery;
- damaged motor, propeller, guard, connector, or board;
- missing critical part;
- incompatible revision or connector.

## G2 — Bench bring-up, propellers removed

### Goal

Establish a reproducible software, radio, telemetry, firmware, cue, and emergency-stop baseline without generating thrust.

### Required outputs

- host OS and toolchain versions;
- reproducible installation commands;
- firmware versions and commit hashes;
- radio connection proof;
- battery voltage and telemetry logs;
- motor-output test only under the upstream safe procedure and with propellers removed;
- LED test at conservative brightness;
- buzzer test at conservative duration and level;
- emergency-stop behavior;
- fault log.

### Pass criteria

- device connects repeatedly after clean restarts;
- telemetry is readable and timestamped;
- command path is deterministic;
- no unexplained reset, overheating, brownout, or communication loss;
- emergency stop works in every commanded state tested;
- cue devices can be commanded independently.

### Stop conditions

- board or battery becomes unusually hot;
- voltage sag or reset is unexplained;
- motor output occurs unexpectedly;
- command link cannot fail closed;
- physical damage or exposed short risk.

## G3 — Guarded controlled hover

### Goal

Prove repeatable low-altitude flight before adding custom payload.

### Test environment

- indoors or another legally authorized controlled test area;
- clear bounded flight volume;
- prop guards installed;
- no non-participants;
- matte, adequately lit floor for optical flow;
- defined emergency-stop operator;
- low initial altitude;
- charged battery logged before flight.

### Required outputs

- preflight checklist for every run;
- hover telemetry;
- takeoff, hover, land, and emergency-stop results;
- flight duration;
- battery start/end voltage;
- drift and instability observations;
- crash or contact log;
- video reference when available.

### Pass criteria

- at least 10 consecutive controlled takeoff-hover-land cycles without an unexplained fault;
- emergency stop demonstrated safely in a planned low-risk condition;
- no guard, propeller, motor, or connector damage;
- repeatable telemetry capture;
- a documented baseline endurance measurement.

### Stop conditions

- loss of control;
- repeated drift outside the test volume;
- unexpected climb or motor runaway;
- guard or propeller damage;
- battery or motor overheating;
- unexplained communication loss.

## G4 — Visible and audible cue integration

### Goal

Add one cue at a time while preserving controllability, endurance, and safety margin.

### Sequence

1. LED deck only.
2. Buzzer deck only.
3. LED plus buzzer.
4. Prototyping deck only if a missing capability requires it.

### Required outputs

- actual attached mass for each configuration;
- balance and center-of-mass notes;
- current/power observations where available;
- endurance for each configuration;
- hover stability comparison;
- cue activation logs;
- thermal observations;
- safe default settings and maximum test settings.

### Pass criteria

- cue activates on command without destabilizing flight;
- no brownout or reset;
- stable hover remains repeatable;
- endurance remains adequate for the next test;
- cue settings are bounded and not intended to harm or disorient.

### Stop conditions

- loss of stability;
- brownout, reset, or unacceptable endurance collapse;
- excessive heat;
- unsafe visual or audio effect;
- payload attachment loosens or shifts.

## G5 — Activation and reliability characterization

### Goal

Measure the full chain from human command to observable output.

### Required measurements

- human input timestamp;
- radio command timestamp;
- aircraft acknowledgement timestamp;
- cue-on timestamp;
- takeoff start timestamp when flight is part of the sequence;
- stable-hover timestamp;
- failed-command and retry count;
- false activation count;
- emergency-stop latency;
- battery state.

### Pass criteria

Thresholds are set before testing. Initial planning thresholds:

- at least 30 consecutive activation trials;
- at least 95% successful cue activations in the controlled environment;
- no unexplained autonomous movement;
- all failures recover to a safe state;
- latency distribution reported with median, 90th percentile, maximum, and failure rate.

These are engineering planning thresholds, not validated safety standards.

## G6 — Consented staged mechanism comparison

### Goal

Determine whether the flying/elevated condition adds meaningful behavioral effect versus simpler alternatives.

### Conditions

- no intervention;
- on-body alarm;
- light plus spoken recording/help warning;
- elevated stationary witness;
- flying reference unit.

### Required safeguards

- written scenario and explicit informed consent;
- actors know a flying unit may operate;
- no surprise, pursuit, targeting, or contact;
- prop guards and bounded flight volume;
- independent stop operator;
- immediate termination for agitation, loss of control, or discomfort;
- data records observable actions, not motive.

### Required measurements

- approach speed and start distance;
- cue onset;
- first-notice time;
- pause duration;
- step-back or direction-change distance;
- additional separation achieved;
- user activation error;
- participant and operator discomfort;
- escalation/agitation marker;
- technical fault.

### Pass criteria

Defined before data collection. The flying condition must outperform the simpler controls by a practically meaningful margin without adding an unacceptable fault, discomfort, or agitation burden.

## G7 — Custom HALO decision

### Build a custom platform only when

- the flying condition provides meaningful additional value;
- deployment latency has a credible path to the intended use case;
- reference-platform failures are understood;
- required payload and endurance are quantified;
- user/operator workflow is defined;
- the next custom design removes measured constraints rather than imagined ones.

### Custom-platform outputs

- system requirements;
- architecture decision;
- mass and power allocations;
- propulsion sizing;
- enclosure and guard requirements;
- electronics and PCB plan;
- software/firmware architecture;
- manufacturing and test plan;
- updated legal and insurance review;
- budget and timeline based on actual reference data.

## Explicitly deferred

Until G7:

- autonomous person detection;
- following, pursuit, interception, or targeting;
- on-aircraft face or identity processing;
- swarms;
- public-space or real-confrontation deployment;
- automated charging docks;
- custom PCB;
- custom propulsion;
- custom molded enclosure;
- crowdfunding, consumer efficacy claims, or safety certification claims.
