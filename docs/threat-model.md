# Threat Model

LineProof protects fairness-critical queue state, escrowed funds, and auditability. This document lists the assets, trust boundaries, attacker goals, and mitigations maintainers should consider when changing the protocol.

## Assets

- Queue configuration and lifecycle state.
- Participant enrollment records and position order.
- Identity bindings and duplicate-prevention records.
- Escrow deposits and release/refund status.
- Contract upgrade authority.
- Event history used for independent audits.

## Trust Boundaries

| Boundary | Trusted for fairness? | Notes |
|----------|-----------------------|-------|
| Soroban contracts | Yes | Contract storage and successful transactions are authoritative. |
| SDK | No | Convenience layer; must not create off-chain-only guarantees. |
| Backend | No | May index or cache state, but contract state wins. |
| Frontend | No | Displays state and initiates calls only. |
| Operator admin key | Partially | Required for current privileged actions; must be monitored and eventually governed by multisig. |
| Identity provider | Depends | Future providers must be evaluated for Sybil resistance and privacy. |

## Attacker Goals

- Obtain multiple queue positions.
- Sell or transfer a valuable queue position.
- Advance a favored participant out of order.
- Lock participant funds indefinitely.
- Release escrow without service.
- Hide or rewrite queue history.
- Exploit SDK or backend confusion to mislead users.
- Leak sensitive applicant data through on-chain metadata.

## Mitigations

| Threat | Mitigation |
|--------|------------|
| Duplicate enrollment | One active enrollment per identity per queue. |
| Position resale | Non-transferable identity-bound positions. |
| Opaque admin action | Privileged transitions emit events and are auditable. |
| Escrow theft | Release/refund/expiry state machine with terminal states. |
| Event tampering | Events are emitted by contract transactions and backed by ledger history. |
| Unbounded work denial of service | Batch limits and pagination requirements for large queues. |
| Personal data exposure | Store identifiers, hashes, or commitments instead of raw personal data. |
| Misleading UI | Document that frontend/backend state is not authoritative. |

## Residual Risks

- Stellar account ownership alone does not prove a unique human or eligible applicant.
- Wallet sharing can bypass non-transferability at the social layer.
- A malicious or compromised admin can still trigger allowed privileged transitions, though the actions are visible.
- Incorrect contract upgrades can weaken invariants if governance controls are insufficient.
- Escrow integrations must be tested against actual asset contracts before production use.

## Review Triggers

Run a threat-model review when a change touches:

- Queue ordering or advancement.
- Identity binding.
- Escrow custody or asset transfer.
- Contract upgrade authority.
- Event schema.
- SDK signing or transaction construction.
- Any field that could contain personal data.
