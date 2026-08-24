# Codex Task H0 — Close the Reference Platform and Gate 1 Order

Use **Code mode** in the `fitzss/Deter` repository on branch:

```text
codex/halo-hardware-program
```

Do not start from `main` or create another project scaffold.

## Objective

Turn the provisional HALO V0 hardware plan into a purchase-ready, internally consistent Gate 1 engineering package. This task should enable Fitz to place the first hardware order confidently and then use the same repository for receipt, assembly, bring-up, testing, and iteration.

Do not place an order. Do not claim physical verification. Prepare the decision and exact founder actions.

## Read first

Read these files completely before editing:

- `AGENTS.md`
- `docs/CODEX_HANDOFF.md`
- `docs/HARDWARE_ROADMAP.md`
- `docs/PROCUREMENT_PLAN.md`
- `docs/BUILD_TEST_PROTOCOL.md`
- `decisions/ADR-001-reference-platform.md`
- `hardware/bom.csv`
- `hardware/weight_power_budget.csv`
- `hardware/inventory.csv`
- `README.md`

Also inspect the existing HALO Lab code so you understand what software already exists, but do not let software cleanup displace the hardware objective.

## Required research

Use internet access if it is enabled. Prefer official manufacturer pages, official documentation, schematics, datasheets, compatibility matrices, and upstream repositories.

Recheck as of the actual task date:

1. Crazyflie 2.1 Brushless specifications.
2. Brushless STEM bundle contents, price, and stock status.
3. Flow deck v2 compatibility and mounting position.
4. Buzzer deck compatibility, mass, and electrical requirements.
5. Top Color LED deck compatibility, mass, current requirements, firmware requirements, and mounting constraints.
6. Whether Flow + top Color LED + Buzzer can be stacked simultaneously on the brushless platform.
7. Exact official pin/header set needed for that stack.
8. Crazyflie expansion-port voltage/current limitations relevant to the planned decks.
9. Battery/charger compatibility and current shipping restrictions.
10. Spare propeller and guard/leg SKUs and availability.
11. Current upstream Python client/library and firmware repositories and supported setup path.
12. Any current product notice, known issue, firmware requirement, or compatibility caveat that changes the plan.

Record every material source and date checked. Do not use an uncited reseller claim as engineering truth.

## Platform comparison

Challenge ADR-001 rather than merely ratifying it.

Compare at least:

- Crazyflie 2.1 Brushless STEM bundle;
- brushless Happy Hacker bundle plus Flow deck;
- standalone brushless platform plus required decks/radio;
- Crazyflie 2.1+ as a cheaper learning mule;
- one credible open PX4/ArduPilot guarded micro-platform only if a current, specific candidate can be supported by primary documentation.

Score them on:

- total landed cost;
- stock availability;
- prop guards and test consequence;
- open firmware and host control;
- payload margin;
- flight time;
- indoor position-aided hover;
- deck/payload integration;
- telemetry access;
- recovery and spare parts;
- time to first controlled hover;
- path to later custom hardware.

Do not choose a more complex platform merely because it is closer to the eventual vision.

## Engineering checks

### Mechanical stack

Create a simple stack drawing or ASCII diagram showing:

- aircraft;
- bottom Flow deck;
- top deck order;
- pin/header arrangement;
- battery and guard clearance;
- expected mass of every attached item.

Flag any interference or unsupported assumption.

### Mass budget

Update `hardware/weight_power_budget.csv` with:

- corrected published masses;
- expected Gate 1 flight configurations;
- estimated all-up mass;
- remaining manufacturer-published payload margin;
- rows for actual measurements to be entered after receipt.

Do not confuse payload limit with guaranteed flight quality.

### Electrical budget

Create the clearest available planning budget for:

- battery nominal energy;
- aircraft baseline demand if published or measurable later;
- Flow deck;
- LED deck at conservative and published maximum settings;
- Buzzer deck;
- expansion-port limits;
- remaining uncertainty.

Use blank/TBD rather than invented numbers. Identify exactly what must be measured at G2.

### Command architecture

Document the initial command path:

```text
human input -> host process -> Crazyradio 2.0 -> aircraft firmware -> cue/flight action -> telemetry acknowledgement
```

Identify which timestamps can be captured in software and which later require independent measurement.

## Procurement outputs

Update `docs/PROCUREMENT_PLAN.md` and `hardware/bom.csv` so they contain:

### BUY NOW

Only components required to unlock G2–G4.

For every item include:

- manufacturer;
- exact product and SKU;
- quantity;
- live price;
- stock status;
- supplier URL;
- mass;
- electrical/interface facts;
- exact test unlocked;
- substitute;
- compatibility status.

### BUY LOCALLY

Generic safety/tools list with a realistic allowance.

### WAIT

Items that might be useful later but are not justified now.

### DO NOT BUY

Items that would add risk, cost, or false progress.

### Cart summary

Calculate:

- official-store subtotal;
- known shipping/tax if the store exposes them before checkout;
- generic local-supply allowance;
- maximum approved delivered cap;
- contingency;
- amount remaining under cap.

Do not fabricate shipping or tax. Label them unknown until the founder supplies checkout values.

## Repository workflow outputs

Create or improve:

1. `docs/ORDER_SHEET.md` — one page Fitz can use during checkout.
2. `docs/RECEIVING_CHECKLIST.md` — exact receipt and inspection actions.
3. `docs/SOFTWARE_BRINGUP.md` — current upstream installation and connection procedure, but no unverified physical result.
4. `hardware/stack_plan.md` — deck order, mechanical assumptions, and photos/measurements to capture after receipt.
5. `hardware/toolchain_versions.md` — repositories, releases/commits, and versions to pin.
6. Any small validation script that materially reduces BOM arithmetic or schema errors. Do not create software for appearance.

If you add code, preserve the existing application and run its checks.

## Physical actions for Fitz

End with a short, exact sequence of founder actions:

1. review the decision and contradictions;
2. confirm or change the spending cap;
3. open the verified order sheet;
4. recheck checkout total and stock;
5. place the order;
6. send Codex the order confirmation details without exposing unnecessary personal/payment information;
7. update inventory status;
8. wait for receipt before any physical-test claim.

## Boundaries

Do not add or recommend:

- autonomous threat or intent classification;
- facial recognition;
- person tracking, pursuit, interception, or aiming;
- harmful, contact, laser, weapon, spray, shock, or entanglement payloads;
- intentionally disorienting light or audio output;
- surprise or public testing;
- claims that HALO currently protects or deters people;
- vision, swarm, dock, custom PCB, or custom airframe purchases unless the H0 analysis discovers a direct blocker that cannot be solved otherwise.

## Verification

If repository code changes, run:

```bash
npm ci
npm audit --audit-level=high
npm run typecheck
npm test
npm run build
```

Validate all CSV files you modify for consistent column counts and numeric totals.

## Completion report

Report:

- architecture and files found;
- sources checked and date;
- strongest case against the selected platform;
- selected platform and why;
- compatibility conclusions and remaining unknowns;
- stack arrangement;
- mass and power budget conclusions;
- exact BUY NOW subtotal and delivered-cost unknowns;
- files changed;
- commands/tests run;
- physical evidence received: expected to be none;
- Gate G0 acceptance criteria pass/fail;
- exact founder actions required to authorize and place Gate 1 order;
- next task after order confirmation.
