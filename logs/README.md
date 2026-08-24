# HALO Hardware Logs

This directory contains structured records of physical work. A chat message is not a durable test record.

## Required log types

- `battery_log.csv` — battery identity, charging, voltage, condition, and retirement;
- `fault_log.csv` — every unexpected physical or software event;
- dated build logs — assembly and configuration changes;
- dated test-run logs — objective, configuration, measurements, result, and evidence links.

## Rules

1. Never delete a failed run because a later run passed.
2. Never change an observation to make it agree with an interpretation.
3. Use `null`, blank, or `not measured` for missing data; never invent zero.
4. Record units.
5. Separate published specifications, estimates, and actual measurements.
6. Link raw telemetry, photos, screenshots, or videos when available.
7. Record who performed the physical action.
8. Mark physical results `unverified` until the operator supplies evidence.
9. Use one stable run identifier across filenames, software records, and notes.
10. Commit completed records promptly.

## File naming

```text
YYYY-MM-DD_gate_run-short-description.md
```

Copy templates from `templates/` rather than overwriting them.
