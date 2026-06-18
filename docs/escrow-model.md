# Escrow Model

Escrow is optional. When enabled, it links a participant's queue position to a payment hold so funds are handled by contract rules rather than manual operator discretion.

## Design Goals

- Hold deposits only for queues that explicitly require escrow.
- Make release, refund, and expiry conditions auditable.
- Prevent operators from taking funds before the participant is served.
- Give participants a recovery path when a queue stalls or is cancelled.
- Avoid storing personal or payment-sensitive metadata on-chain.

## States

| State | Description | Terminal |
|-------|-------------|----------|
| `Active` | Deposit is held for a participant and queue. | No |
| `Released` | Funds were released to the operator because the participant was served. | Yes |
| `Refunded` | Funds were returned to the participant. | Yes |
| `Expired` | Recovery period elapsed and funds are recoverable through the configured expiry path. | Yes |

## State Transitions

```
deposit
  |
  v
Active
  |----------- release -----------> Released
  |----------- refund ------------> Refunded
  |----------- expire ------------> Expired
```

## Deposit Workflow

1. Queue configuration declares that escrow is required.
2. Participant enrolls or begins enrollment.
3. Participant deposits the configured asset and amount.
4. Escrow contract validates amount bounds, queue ID, identity, and authorization.
5. Escrow record becomes `Active`.
6. Event consumers index the deposit for participant and operator dashboards.

## Release Workflow

Release should happen only when the participant is served or the queue rules define an equivalent successful outcome.

1. Queue advancement marks the participant position as advanced or serviceable.
2. Escrow release is invoked by the authorized operator or by the queue integration path supported by the contract version.
3. Escrow contract checks the record is `Active`.
4. Funds transfer to the configured recipient.
5. Escrow record becomes `Released`.
6. A release event is emitted.

## Refund Workflow

Refunds cover cancellation, failed service, policy-defined withdrawal, or operator action after a queue closes without serving the participant.

1. Refund path is invoked for an `Active` escrow record.
2. Contract validates authorization and queue policy.
3. Funds return to the participant.
4. Escrow record becomes `Refunded`.
5. A refund event is emitted.

## Expiry Workflow

Expiry is a participant protection path. It should be available when the configured hold period elapses and no release or refund has occurred.

1. Participant or authorized automation invokes expiry.
2. Contract compares current ledger time with the record's expiry time.
3. Funds become recoverable according to the contract version.
4. Escrow record becomes `Expired`.
5. An expiry event is emitted.

## Configuration Fields

- `asset`: asset contract or native asset identifier.
- `amount`: required deposit amount.
- `minDeposit` and `maxDeposit`: bounds for flexible deposit policies.
- `recipient`: operator or treasury address for released funds.
- `holdPeriod`: maximum time a deposit can remain active without release or refund.
- `refundPolicy`: reason codes and authorization rules for refunds.

## Invariants

- A terminal escrow record cannot return to `Active`.
- An escrow record cannot be released and refunded.
- A release must correspond to a valid queue outcome.
- A refund must return funds to the participant identity associated with the record.
- Expiry must not be available before the configured time.

## Implementation Notes

The current scaffold documents the desired escrow state machine and includes an initial Soroban escrow crate. Before production use, maintainers should add integration tests that exercise queue advancement and escrow release/refund together, not only as isolated contract calls.
