# Escrow Lifecycle

This short reference mirrors the fuller escrow design in [escrow-model.md](escrow-model.md).

## States

- `Active`: deposit is held in escrow.
- `Released`: funds were transferred to the configured recipient.
- `Refunded`: deposit was returned to the participant.
- `Expired`: the hold period elapsed and the recovery path was used.

## State Transitions

- `deposit`: external deposit to `Active`.
- `release`: `Active` to `Released`.
- `refund`: `Active` to `Refunded`.
- `expire`: `Active` to `Expired`.

## Event Coverage

Every state transition should emit a `lineproof.escrow.*` event that can be verified against contract state.
