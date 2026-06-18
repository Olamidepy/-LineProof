# Event Model

LineProof events are emitted by Soroban contracts so auditors and applications can reconstruct queue history.

## Event Topics

- `lineproof.factory`: factory lifecycle and queue registration events.
- `lineproof.queue`: queue lifecycle transitions, advancement, and closure.
- `lineproof.enrollment`: enrollment creation and cancellation.
- `lineproof.escrow`: deposit, release, refund, and expiry.
- `lineproof.identity`: identity binding and rejected transfer attempts.

## Common Fields

Events should include the queue identifier, relevant position ID when applicable, relevant identity when applicable, event kind, and ledger timestamp.

## Design Requirements

- Events must not include personal data.
- Events should be stable enough for indexers to support audits.
- Event schema changes should be documented in `CHANGELOG.md`.
- Backend and frontend services should treat events as audit inputs, not as replacements for contract state.
