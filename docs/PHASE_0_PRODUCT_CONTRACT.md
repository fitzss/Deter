# Phase 0 Product Contract

## 1. Purpose

HALO Lab exists to turn Deter's central idea into a falsifiable experimental program.

The current question is not:

> Can we build a palm-sized drone?

The current question is:

> In a bounded, consented staged approach, does an elevated and conspicuous intervention create more usable time or distance than simpler alternatives?

Phase 0 is complete when the software can record trustworthy comparison trials. It is not complete merely because the interface looks polished.

## 2. Current factual status

Supported by the historical project materials:

- Deter proposed a pre-contact interruption using light, sound, visible recording, and an elevated device.
- HALO was the proposed personal-device form factor.
- Pause duration, separation gained, activation under stress, and carry willingness were proposed success signals.

Not yet established:

- that the mechanism improves real-world safety;
- that a flying device outperforms an alarm, light, voice warning, or stationary camera;
- that the intervention consistently reduces escalation;
- that users will carry or maintain the device;
- that a viable consumer or institutional market exists.

The application must preserve this distinction.

## 3. Initial bounded scenario

The reference scenario is:

> A solo night-shift worker crosses a private parking area toward a vehicle while a consented role-player begins a scripted approach before contact distance.

Why this scenario:

- the physical route is bounded;
- the property owner can grant permission;
- the participant and role-player can consent;
- distance and timing can be measured;
- an employer or property operator could eventually become the buyer;
- the user has an identifiable destination and exit path.

Phase 0 must not generalize results from this scenario to domestic violence, surprise attacks, armed attacks, group assaults, enclosed spaces, or encounters already at contact distance.

## 4. Hypotheses

### H0 — null

The flying or elevated intervention creates no meaningful additional pause or separation compared with simpler alternatives.

### H1 — behavioral effect

One or more intervention conditions create a measurable change in notice latency, pause duration, or separation.

### H2 — form-factor value

The elevated stationary or flying condition produces a material improvement over an on-body alarm or light-and-voice condition.

### H3 — operational viability

A target user can activate the workflow reliably under cognitive load without unacceptable distraction or escalation.

HALO as a drone is supported only if H2 and H3 survive testing.

## 5. Comparison conditions

Every condition must use the same scenario script as closely as practical.

| ID | Condition | Question isolated |
|---|---|---|
| `control` | No intervention | What happens without a cue? |
| `alarm` | On-body alarm | Does sound alone alter the approach? |
| `light_voice` | Light plus recording warning | Does conspicuous social exposure add value? |
| `elevated_witness` | Elevated stationary light/camera prop | Does elevation add value without flight? |
| `flying_unit` | Simulated or approved off-the-shelf flying unit | Does motion or autonomous appearance add value? |

The application must not imply that the flying condition is expected to win.

## 6. Operator state machine

```text
idle → armed → active → resolved
           ↘ aborted
idle/armed/active → fault
```

Rules:

- Only a human operator may arm, trigger, resolve, abort, or fault a trial.
- Invalid transitions fail closed.
- The event ledger is append-only.
- A `control` trigger records the observation start but emits no simulated output events.
- A `flying_unit` trigger records simulated events only and must explicitly state that no hardware command was sent.
- Terminal trials cannot be reopened or mutated into a different terminal state.

## 7. Metrics

### Automated from the ledger

**Activation latency**

Time from the `ARMED` event to the `TRIGGERED` event. This measures the software workflow, not total bag-to-air or physical deployment time.

Future hardware trials must separately measure physical deployment latency.

### Human entered

**Notice latency**

Time from the first observable intervention cue to the role-player's first observable orientation or response.

**Pause duration**

Duration during which forward approach stops or materially slows. The protocol must define the coding rule before trials begin.

**Separation gained**

Additional distance between participants during the measured pause, recorded in feet for the first prototype.

**Operator cognitive load**

A 1–5 self-report immediately after the trial.

**Escalation observed**

A flag for observable agitation, acceleration, verbal escalation, attempt to strike the prop/device, or other pre-defined adverse behavior. Notes must describe the observation rather than infer intent.

### Later metrics, not yet implemented

- carry adherence;
- charged-and-ready rate;
- false activation rate;
- setup or deployment failure rate;
- bystander reaction;
- perceived nuisance;
- user route or risk compensation;
- institutional willingness to pay.

## 8. Evidence requirements

A trustworthy record contains:

- unique trial ID;
- creation time;
- bounded scenario description;
- comparison condition;
- event ledger with timestamps;
- terminal state;
- activation latency when applicable;
- observation values or explicit unknowns;
- escalation flag;
- notes on observable behavior and uncertainty;
- schema version in exported data.

Unknown values remain `null`. The application must not silently convert missing observations to zero.

## 9. Software acceptance criteria

Phase 0 foundation is acceptable when:

1. A contributor can install, type-check, test, build, and run the project from the README.
2. Every allowed and forbidden state transition has test coverage.
3. Control trials generate no warning or recording output events.
4. Flying-unit trials are unmistakably simulations.
5. Consent confirmation is required before arming.
6. Trial events and human observations remain visibly distinct.
7. Completed records persist locally across refreshes.
8. Records export as versioned, human-readable JSON.
9. Missing metrics remain missing rather than becoming zero.
10. The interface works by keyboard, at mobile width, and without relying on color alone.

## 10. Provisional empirical decision gates

These are internal precommitment thresholds, not established safety standards.

A later experiment plan may provisionally require:

- median additional pause of roughly 2 seconds over alarm-only;
- measurable additional separation over simpler conditions;
- at least 80% successful activation inside the required scenario window;
- at least 50% seven-day carry adherence in a small target-user trial;
- no unacceptable escalation pattern;
- meaningful deposits or one funded institutional pilot before custom product engineering.

The precise thresholds, sample size, coding rubric, and statistical analysis must be defined before collecting decision-grade data. Phase 0 software must not display these provisional numbers as achieved targets.

## 11. Mandatory stop conditions for staged trials

A human safety lead must stop a trial when:

- consent is withdrawn;
- an unbriefed bystander enters the test area;
- a participant departs from the approved script;
- physical contact becomes possible;
- a prop or device behaves unexpectedly;
- visibility, weather, site access, or communication becomes unsafe;
- any participant reports distress or uncertainty about continuing.

HALO Lab's abort state exists to preserve these stops in the evidence ledger.

## 12. Out of scope

Phase 0 excludes:

- real-world deployment against unsuspecting people;
- autonomous detection of suspicious behavior;
- identity, demographic, emotion, or intent classification;
- facial recognition;
- automated following or pursuit;
- autonomous flight or navigation;
- payload control;
- high-intensity light or sound specifications;
- emergency-service dispatch;
- cloud accounts, multi-tenant storage, or production security;
- medical, legal, regulatory, or efficacy claims;
- Guardian Swarm or Safety Mesh architecture.

## 13. Phase progression

### Phase 0 — software and protocol

Build the simulator, event ledger, data export, and controlled comparison workflow.

### Phase 1 — mechanism study

Run approved, consented comparisons with simple non-harmful props or simulators. Determine whether elevation or motion adds behavioral value.

### Phase 2 — operational mockup

Test carry, charging, accessibility, activation, and failure behavior with a nonfunctional or approved mockup.

### Phase 3 — hardware adapter, only if earned

Define a narrow, human-commanded device interface. Keep simulation and hardware adapters separate. Require independent safety, regulatory, privacy, and insurance review before any physical trial.

### Phase 4 — funded pilot, only if earned

Use one bounded private-property environment with an identified buyer, approved protocol, documented limitations, and explicit closure criteria.
