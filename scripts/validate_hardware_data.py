#!/usr/bin/env python3
"""Validate HALO hardware-program CSV ledgers without third-party packages."""

from __future__ import annotations

import csv
import math
import sys
from decimal import Decimal, InvalidOperation
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

CSV_FILES = (
    ROOT / "hardware" / "bom.csv",
    ROOT / "hardware" / "weight_power_budget.csv",
    ROOT / "hardware" / "inventory.csv",
    ROOT / "logs" / "battery_log.csv",
    ROOT / "logs" / "fault_log.csv",
)

BOM_STATUSES = {
    "candidate",
    "proposed",
    "approved",
    "ordered",
    "received",
    "tested",
    "rejected",
    "retired",
    "deferred",
    "required-local",
}


def read_rows(path: Path) -> tuple[list[str], list[dict[str, str]]]:
    if not path.exists():
        raise ValueError(f"missing required CSV: {path.relative_to(ROOT)}")

    with path.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames is None:
            raise ValueError(f"missing header: {path.relative_to(ROOT)}")
        headers = [header.strip() for header in reader.fieldnames]
        if any(not header for header in headers):
            raise ValueError(f"blank header in {path.relative_to(ROOT)}")
        if len(headers) != len(set(headers)):
            raise ValueError(f"duplicate header in {path.relative_to(ROOT)}")

        rows: list[dict[str, str]] = []
        for line_number, raw in enumerate(reader, start=2):
            if None in raw:
                raise ValueError(
                    f"too many columns in {path.relative_to(ROOT)} line {line_number}: "
                    f"{raw[None]}"
                )
            normalized = {key.strip(): (value or "").strip() for key, value in raw.items()}
            if not any(normalized.values()):
                continue
            rows.append(normalized)

    return headers, rows


def decimal_value(value: str, field: str, row_id: str) -> Decimal | None:
    if value == "":
        return None
    try:
        return Decimal(value)
    except InvalidOperation as exc:
        raise ValueError(f"{row_id}: {field} must be numeric, got {value!r}") from exc


def validate_bom(rows: list[dict[str, str]]) -> Decimal:
    required = {
        "item_id",
        "manufacturer",
        "part_name",
        "unit_price_usd",
        "quantity",
        "extended_price_usd",
        "gate",
        "status",
        "date_checked",
    }
    if rows and not required.issubset(rows[0]):
        missing = sorted(required - set(rows[0]))
        raise ValueError(f"hardware/bom.csv missing columns: {missing}")

    seen: set[str] = set()
    gate_one_proposed_total = Decimal("0")

    for row in rows:
        item_id = row["item_id"]
        if not item_id:
            raise ValueError("hardware/bom.csv contains a blank item_id")
        if item_id in seen:
            raise ValueError(f"hardware/bom.csv duplicate item_id: {item_id}")
        seen.add(item_id)

        status = row["status"]
        if status not in BOM_STATUSES:
            raise ValueError(f"{item_id}: unknown BOM status {status!r}")

        quantity = decimal_value(row["quantity"], "quantity", item_id)
        unit_price = decimal_value(row["unit_price_usd"], "unit_price_usd", item_id)
        extended = decimal_value(row["extended_price_usd"], "extended_price_usd", item_id)

        if quantity is not None and quantity <= 0:
            raise ValueError(f"{item_id}: quantity must be positive")
        if unit_price is not None and unit_price < 0:
            raise ValueError(f"{item_id}: unit price cannot be negative")
        if extended is not None and extended < 0:
            raise ValueError(f"{item_id}: extended price cannot be negative")

        if quantity is not None and unit_price is not None and extended is not None:
            expected = (quantity * unit_price).quantize(Decimal("0.01"))
            if expected != extended.quantize(Decimal("0.01")):
                raise ValueError(
                    f"{item_id}: extended price {extended} does not equal "
                    f"quantity x unit price ({expected})"
                )

        if row["gate"] == "G1" and status == "proposed" and extended is not None:
            gate_one_proposed_total += extended

    return gate_one_proposed_total


def validate_unique(rows: list[dict[str, str]], field: str, relative_path: str) -> None:
    seen: set[str] = set()
    for row in rows:
        value = row.get(field, "")
        if not value:
            raise ValueError(f"{relative_path}: blank {field}")
        if value in seen:
            raise ValueError(f"{relative_path}: duplicate {field} {value!r}")
        seen.add(value)


def main() -> int:
    errors: list[str] = []
    loaded: dict[str, list[dict[str, str]]] = {}

    for path in CSV_FILES:
        try:
            _, rows = read_rows(path)
            loaded[str(path.relative_to(ROOT))] = rows
        except ValueError as exc:
            errors.append(str(exc))

    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1

    try:
        subtotal = validate_bom(loaded["hardware/bom.csv"])
        validate_unique(
            loaded["hardware/weight_power_budget.csv"],
            "configuration_id",
            "hardware/weight_power_budget.csv",
        )
        validate_unique(
            loaded["hardware/inventory.csv"],
            "inventory_id",
            "hardware/inventory.csv",
        )
        validate_unique(
            loaded["logs/battery_log.csv"],
            "battery_id",
            "logs/battery_log.csv",
        )
        validate_unique(
            loaded["logs/fault_log.csv"],
            "fault_id",
            "logs/fault_log.csv",
        )
    except ValueError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1

    if not math.isfinite(float(subtotal)):
        print("ERROR: Gate 1 proposed subtotal is not finite", file=sys.stderr)
        return 1

    print("Hardware CSV validation passed.")
    print(f"Gate 1 proposed official-part subtotal: ${subtotal:.2f}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
