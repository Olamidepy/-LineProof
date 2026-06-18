# Events Reference

LineProof uses events for auditability. Integrators should listen to events, verify contract state when making decisions, and preserve enough history for participants to inspect queue outcomes.

## Topics

- `lineproof.factory`
- `lineproof.queue`
- `lineproof.enrollment`
- `lineproof.escrow`
- `lineproof.identity`

## Expected Event Families

| Family | Examples |
|--------|----------|
| Factory | queue registered, implementation version registered. |
| Queue | enrollment opened, enrollment closed, position advanced, queue closed. |
| Enrollment | participant enrolled, enrollment cancelled. |
| Escrow | deposit recorded, funds released, funds refunded, hold expired. |
| Identity | identity bound, transfer rejected. |

## Consumer Guidance

- Do not store personal data in event fields.
- Treat event order and contract storage together when reconstructing state.
- Design indexers for pagination and replay.
- Alert on unexpected admin activity, duplicate failures, and rejected transfer attempts.
