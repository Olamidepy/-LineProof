#!/usr/bin/env bash
# export_events.sh
# Fetches and exports on-chain events for a LineProof contract to a JSON file.
# Usage: ./scripts/export_events.sh <contract-id> [output-file]

set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <contract-id> [output-file]"
  exit 1
fi

CONTRACT_ID="$1"
OUTPUT="${2:-events_${CONTRACT_ID:0:8}_$(date +%Y%m%d%H%M%S).json}"
NETWORK="${STELLAR_NETWORK:-testnet}"
START_LEDGER="${START_LEDGER:-1}"

echo "Fetching events for contract $CONTRACT_ID on $NETWORK (from ledger $START_LEDGER)…"

soroban events \
  --id "$CONTRACT_ID" \
  --network "$NETWORK" \
  --start-ledger "$START_LEDGER" \
  --output json \
  > "$OUTPUT"

COUNT=$(jq '.events | length' "$OUTPUT" 2>/dev/null || echo "unknown")
echo "  ✓ Exported $COUNT events to $OUTPUT"
