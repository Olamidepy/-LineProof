# Security Considerations

LineProof manages access to real-world resources and may custody escrowed funds. Security reviews should cover both smart-contract behavior and the social systems around queues.

## Security Properties

- Queue positions are bound to participant identities.
- Contract state is the source of truth for lifecycle and advancement.
- Privileged actions require explicit authorization.
- Escrow records have terminal states that prevent double release/refund outcomes.
- Public events support independent audit reconstruction.
- Personal data should stay off-chain.

## Smart Contract Risks

### Access Control

Admin-only operations must call `require_auth()` for the expected authority. Any change to queue lifecycle, contract registration, escrow release, or upgrade authorization needs tests for both authorized and unauthorized callers.

### State Corruption

Contracts must reject invalid lifecycle transitions, duplicate advancement, capacity overflow, duplicate enrollment, and terminal-state reversal.

### Escrow Safety

Escrow code must ensure a deposit cannot be released twice, refunded after release, released after refund, or expired before its configured time. Asset transfer behavior must be tested against the token contracts used in deployment.

### Storage and Denial of Service

Large queues must avoid unbounded loops. List operations should use pagination or event indexing rather than full storage scans.

### Upgrade Risk

Contract upgrades can weaken invariants if governance is loose. Production deployments should require multisig approval, published checksums, compatibility notes, and a migration plan.

## Privacy

Do not write protected health information, passport numbers, student records, full names, email addresses, phone numbers, or other sensitive personal data on-chain. Use off-chain systems for sensitive data and store only references, hashes, or commitments when needed.

## Threat Model

The detailed threat model is maintained in [threat-model.md](threat-model.md). Review it whenever queue ordering, identity, escrow, upgrade authority, event schemas, or SDK signing changes.

## Known Limitations

- Account-based identity does not fully prevent Sybil attacks.
- Wallet sharing can still happen outside the protocol.
- Current admin authorization is not the same as decentralized governance.
- Production escrow requires deeper integration testing and external review.
- Verifiable randomness and priority-tier fairness are planned, not complete.

## Reporting Vulnerabilities

Follow [../SECURITY.md](../SECURITY.md). Do not disclose suspected vulnerabilities in public issues or discussions.
