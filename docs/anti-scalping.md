# Anti-Scalping Design

Scalping is the practice of obtaining access to scarce resources and reselling that access at a premium. LineProof reduces this risk by making queue positions identity-bound and non-transferable.

## Core Mechanisms

### Non-Transferable Positions

Queue positions are bound to the enrolling identity. Transfer checks must reject movement from one identity to another.

```rust
fn can_transfer(from: Address, to: Address) -> bool {
    from == to
}
```

This means a participant cannot sell a position as a transferable on-chain asset.

### Identity Binding

Each enrollment is associated with the caller's identity record. The initial scaffold uses Stellar account identity. Future deployments can add stronger off-chain identity attestations, but those systems must avoid writing personal data on-chain.

### Duplicate Prevention

The enrollment model prevents the same identity from enrolling more than once in the same queue. This is not the same as proving one unique human per queue. Sybil resistance requires additional identity or eligibility checks.

### Transfer Attempt Logging

Rejected transfer attempts should emit events so operators and auditors can detect abuse patterns.

## Mitigated Attacks

| Attack | Mitigation |
|--------|------------|
| Selling a queue token | No transferable queue token is issued. |
| Moving a position to another wallet | Transfer checks reject different identities. |
| Duplicate entry by same identity | Enrollment uniqueness check. |
| Hidden admin favoritism | Admin actions and advancement events are auditable. |
| Misleading application state | Contract storage and events remain authoritative. |

## Residual Risks

- A user can share or sell access to an entire wallet outside the protocol.
- One person may control multiple Stellar accounts unless stronger identity verification is added.
- Operators still need secure admin key management.
- Venue, clinic, agency, or merchant check-in systems must verify that the claimant matches the enrolled identity.

## Design Guidance

- Bind service redemption to the same identity used for enrollment.
- Publish eligibility rules before enrollment opens.
- Keep personal data off-chain and store commitments or references instead.
- Monitor rejected transfers, duplicate attempts, and unusual enrollment patterns.
- Do not describe Sybil resistance as complete until a concrete identity provider is integrated and reviewed.
