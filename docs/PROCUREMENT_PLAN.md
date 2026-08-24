# Gate 1 Procurement Plan — HALO Reference Platform

**Status:** proposed, not yet approved or ordered  
**Price/availability check date:** 2026-08-24  
**Target delivered spending cap:** USD 750, including shipping, tax, and generic battery-safety supplies

Recheck stock, price, shipping restrictions, compatibility, and landed total immediately before purchase.

## Decision

Use the **Crazyflie 2.1 Brushless STEM bundle** as the first physical reference platform.

This is not a claim that the platform is a viable consumer HALO. It is the least-custom open platform found that can support guarded indoor flight, Python control, telemetry, optical-flow-aided hover, and small modular cue payloads while preserving substantial published payload margin.

Manufacturer-published reference specifications:

- 37 g takeoff weight with guards;
- approximately 10-minute flight time with the stock battery;
- 40 g maximum recommended stock payload;
- open-source firmware and library support;
- expansion-deck interface;
- brushless propulsion;
- prop guards;
- Python control and telemetry through Crazyradio 2.0.

Primary source: https://www.bitcraze.io/products/crazyflie-2-1-brushless/

## BUY NOW — Gate 1 cart

| Qty | Item | SKU | Official price | Purpose | Current disposition |
|---:|---|---|---:|---|---|
| 1 | STEM bundle — Crazyflie 2.1 Brushless | 900000099 | $550.00 | Brushless guarded platform, Flow deck v2, Crazyradio 2.0 | Approve after final stock/cart check |
| 1 | Buzzer deck | 102990228 | $11.00 | First lightweight audible cue | Approve |
| 1 | Color LED deck — top mounted | 100083467 | $23.00 | Visible cue while Flow deck remains underneath | Approve subject to deck-stack verification |
| 1 | Prototyping deck | 114990115 | $5.50 | Later low-mass custom circuit experiments | Approve; do not fly until needed |
| 1 | Long Pins (19+2+4 mm) | 100061450 | $2.00 | Stack Flow deck underneath and two decks above if required | Approve subject to stack drawing |
| 2 | 350 mAh LiPo battery | 114993131 | $24.00 total | Repeatable tests and battery rotation | Approve; observe shipping restrictions |
| 1 | 500 mA LiPo USB charger | 102990463 | $6.00 | Charge one spare separately | Approve |
| 2 | Propeller 55-35 pack, black or green | store spare-parts listing | $12.00 total | Recover from ordinary propeller damage | Approve |
| 1 | 5 legs + 5 guards spare kit | 114993546 | $10.00 | Recover from ordinary guard/leg damage | Approve |

### Official-store subtotal

**$643.50 before shipping and tax.**

### Locally sourced safety supplies

Keep the delivered order under the $750 cap. Obtain locally if not already owned:

- LiPo-safe charging/storage bag or container appropriate for small 1S cells;
- nonflammable charging surface;
- safety glasses for bench work;
- small parts tray;
- digital scale readable to at least 0.1 g;
- multimeter with suitable probes;
- fire extinguisher appropriate to the workspace and local guidance;
- matte, high-contrast indoor test surface;
- physical barriers or netting if the test room needs them.

Do not improvise battery charging or leave a charging battery unattended.

## Why the top-mounted LED deck

The Flow deck is designed to mount underneath the aircraft. The top-mounted Color LED deck leaves that optical-flow/height sensor unobstructed. Bitcraze publishes the Color LED deck as compatible with the Crazyflie 2.1 Brushless and lists a mass of 3.5 g with diffuser.

The Color LED deck can draw up to approximately 300 mA per channel according to the manufacturer. Do not assume maximum-brightness operation is compatible with acceptable endurance or voltage margin. Begin at conservative settings and measure battery behavior and flight stability.

Primary source: https://www.bitcraze.io/products/color-led-deck/

## Initial mass estimate

Do not treat this as a measured build.

| Configuration | Published attached mass |
|---|---:|
| Flow deck v2 | 1.6 g |
| Top Color LED deck | 3.5 g |
| Buzzer deck | 1.8 g |
| Long pins | 0.6 g |
| Combined planned cue/navigation stack | 7.5 g |
| Optional Prototyping deck if later added | +1.5 g |

The planned stock cue/navigation stack is far below the platform's published 40 g recommended payload. That does not prove acceptable endurance, center of mass, deck-bus behavior, current draw, or flight stability. Those remain G2–G4 measurements.

## WAIT — later-gate items

Do not place these in the Gate 1 order unless new evidence changes the decision.

| Item | Why wait | Earliest gate |
|---|---|---|
| Debug adapter / hardware debugger | Stock firmware and Python path should be proven first | G2 fault requires firmware-level debugging |
| Breakout deck | Prototyping deck is sufficient for the first planned payload work | G4 |
| Multi-ranger deck | Adds obstacle ranges but not automatic avoidance; not required for initial hover | G5 or later |
| Lighthouse positioning bundle | High repeatability may become useful, but Flow deck should be characterized first | G5/G6 |
| Bottom Color LED deck | One visible cue is enough to measure initial power/stability cost | G4 after top deck results |
| AI deck or camera payload | Vision is not required to test user-triggered flight and cues | G7 |
| Charging dock / Infinite Flight bundle | Premature before single-unit reliability and a docked deployment use case | G7 |
| Second aircraft | Useful for uptime and A/B testing only after one aircraft is reliable | After G3 |
| Custom radio/controller hardware | Use Crazyradio and host commands first | G5/G7 |
| Custom PCB | Requirements do not exist yet | G7 |
| Custom airframe or enclosure | Must be based on measured reference constraints | G7 |
| Swarm hardware | No single-unit evidence yet | Post-G7 |

## DO NOT BUY for this program phase

- lasers;
- high-powered or deliberately disorienting strobe modules;
- weapon, impact, spray, shock, entanglement, or contact payloads;
- autonomous person-targeting or face-recognition modules;
- expensive machining or molding equipment;
- consumer-manufacturing inventory;
- a large drone selected merely for payload capacity;
- unsupported marketplace clones when the official platform is available.

## Purchase approval checklist

Before the founder places the order, Codex must update this document and `hardware/bom.csv` with:

- [ ] live stock status;
- [ ] current official unit prices;
- [ ] shipping cost and battery shipping restriction;
- [ ] tax and delivered total;
- [ ] exact included battery and connector revision;
- [ ] Color LED, Buzzer, Flow deck, and pin-stack compatibility;
- [ ] expected stack order drawing;
- [ ] confirmed founder spending cap;
- [ ] substitute plan if the STEM bundle is unavailable.

## Substitute decision if brushless STEM bundle is unavailable

Preferred substitute sequence:

1. Buy the standalone Crazyflie 2.1 Brushless plus Flow deck v2 and Crazyradio 2.0 if all are available and the combined price remains reasonable.
2. Buy the brushless Happy Hacker bundle plus Flow deck v2 if hardware debugging/prototyping value justifies the incremental cost.
3. Use the lower-payload Crazyflie 2.1+ STEM bundle only as a software/flight-learning mule, not as proof that the intended cue stack fits the eventual design.
4. Do not jump directly to a custom FPV or PX4 airframe merely because the preferred bundle is temporarily unavailable.

## Primary product pages

- STEM bundle: https://store.bitcraze.io/products/stem-bundle-crazyflie-2-1-brushless
- Brushless platform: https://www.bitcraze.io/products/crazyflie-2-1-brushless/
- Flow deck v2: https://www.bitcraze.io/products/flow-deck-v2/
- Buzzer deck: https://www.bitcraze.io/products/buzzer-deck/
- Color LED deck: https://www.bitcraze.io/products/color-led-deck/
- Prototyping deck: https://www.bitcraze.io/products/prototyping-deck/
- 350 mAh battery: https://store.bitcraze.io/products/350mah-lipo-battery
- Charger: https://store.bitcraze.io/products/500ma-lipo-usb-charger
- Brushless spares: https://store.bitcraze.io/collections/spare-parts-crazyflie-brushless
