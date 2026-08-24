# ADR-001 — Use Crazyflie 2.1 Brushless as the provisional HALO reference platform

- **Status:** Proposed; closes only after H0 compatibility and live-cart verification
- **Date:** 2026-08-24
- **Decision owner:** Fitz Doud
- **Gate:** G0

## Context

Deter needs a physical platform capable of testing user-triggered flight, visible and audible cues, telemetry, command latency, and controlled indoor experiments.

Beginning with a custom airframe, flight controller, propulsion system, PCB, enclosure, and payload would combine too many unknowns. An off-the-shelf consumer camera drone would reduce mechanical work but usually offers weaker firmware access, limited payload integration, and less reproducible command/telemetry control.

The first aircraft is therefore a development mule rather than a consumer prototype.

## Decision

Provisionally select the Crazyflie 2.1 Brushless ecosystem, initially through the official STEM bundle containing:

- Crazyflie 2.1 Brushless;
- Flow deck v2;
- Crazyradio 2.0.

Add a Buzzer deck, top-mounted Color LED deck, official stack pins, a Prototyping deck, two spare batteries, and ordinary crash spares in the first order, subject to final compatibility and live-cart checks.

## Evidence supporting the decision

Manufacturer-published facts checked 2026-08-24:

- 37 g takeoff mass with guards;
- approximately 10-minute stock flight time;
- 40 g maximum recommended stock payload;
- prop guards;
- open-source software and firmware ecosystem;
- Python control and telemetry support;
- expansion-deck interface;
- Flow deck support for optical-flow and height-aided flight;
- Color LED deck compatibility with the brushless platform;
- lightweight Buzzer and Prototyping decks.

Sources:

- https://www.bitcraze.io/products/crazyflie-2-1-brushless/
- https://store.bitcraze.io/products/stem-bundle-crazyflie-2-1-brushless
- https://www.bitcraze.io/products/flow-deck-v2/
- https://www.bitcraze.io/products/color-led-deck/
- https://www.bitcraze.io/products/buzzer-deck/
- https://www.bitcraze.io/products/prototyping-deck/

## Alternatives considered

### Crazyflie 2.1+

Advantages:

- lower purchase cost;
- mature ecosystem;
- available development bundles.

Why not preferred:

- published 15 g payload versus 40 g for the brushless model;
- shorter stock flight time;
- brushed propulsion and lower margin for iterative payload work.

It remains a substitute software/flight-learning mule if the brushless system is unavailable, but it should not be treated as proof of intended payload feasibility.

### Off-the-shelf DJI or similar camera drone

Advantages:

- mature flight control;
- integrated camera;
- consumer usability.

Why not preferred:

- uncertain or restricted low-level control and telemetry;
- weak modular payload interface;
- less suitable for reproducible firmware experiments;
- may encourage testing a product-shaped object before closing engineering questions.

A consumer drone remains useful later as a benchmark for deployment friction and camera quality.

### PX4/ArduPilot custom cinewhoop or research quad

Advantages:

- greater payload and outdoor capability;
- broad autopilot ecosystem;
- closer path to a custom product.

Why not preferred now:

- substantially greater integration burden;
- propulsion, power, tuning, frame, radio, and safety work begin simultaneously;
- higher energy and consequence during beginner testing;
- requirements are not yet measured.

Revisit after reference data identifies constraints the Crazyflie cannot answer.

### Non-flying elevated rig only

Advantages:

- cheapest behavioral-mechanism test;
- no flight risk;
- fast setup.

Why not sufficient alone:

- cannot measure command-to-flight behavior, deployment, hover reliability, moving-witness effect, endurance, or payload/flight interaction.

It remains an essential comparison condition during mechanism trials.

## Consequences

Positive:

- faster transition to physical learning;
- modest first-stage budget;
- open software/firmware path;
- modular cue experiments;
- strong payload margin for a micro research platform;
- lower-energy guarded indoor testing.

Negative:

- not pocket-sized in a consumer-ready sense;
- likely dependent on a host computer/radio during early work;
- Flow deck is environment-dependent;
- stock platform does not prove outdoor use, rapid deployment, or user carry;
- limited battery energy;
- deck stack may not represent final mechanical design;
- high LED power could reduce endurance or cause voltage margin issues;
- reference-platform success may not transfer to a final product.

## Decision closure requirements

This ADR becomes `Accepted` only after Codex Task H0 confirms:

1. live stock and landed cost;
2. deck electrical and mechanical compatibility;
3. stack pin arrangement;
4. estimated mass and power budget;
5. no current manufacturer notice that materially undermines the platform;
6. explicit founder approval of the Gate 1 cart.

## Reversal conditions

Reverse or revise the decision if:

- the required bundle/platform is unavailable for a sustained period;
- the cue/navigation deck combination is incompatible;
- power or deck-bus limits prevent the planned tests;
- the delivered cost exceeds the spending cap;
- another platform provides the same openness and lower integration risk;
- early stock flight reveals a fundamental inability to perform the required controlled tests.
