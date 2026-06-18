# System Overview

LineProof is a Soroban-powered waiting list protocol for oversubscribed resources. It replaces opaque queue administration with contract-enforced state transitions, identity-bound positions, and auditable events.

## Core Flow

1. An operator deploys or registers a queue through the factory.
2. The queue opens enrollment.
3. Participants enroll with an identity-bound position.
4. Optional escrow records hold deposits for service, refund, or expiry.
5. Enrollment closes and the participant set becomes auditable.
6. Positions advance according to the configured rule.
7. The queue closes after service, cancellation, or completion.

## Components

| Component | Role |
|-----------|------|
| Queue factory | Registers queue implementations and queue metadata. |
| Queue contract | Owns lifecycle state, capacity, position records, and advancement. |
| Enrollment contract | Records participant enrollment and prevents duplicates. |
| Identity contract | Binds positions to identities and rejects transfers. |
| Escrow contract | Holds deposits and records release, refund, or expiry. |
| SDK | Provides typed application access to contract calls and queries. |
| Reference apps | Demonstrate operator and participant workflows. |

## Fairness Model

LineProof's fairness model depends on public, replayable state:

- Queue configuration is visible before participants rely on it.
- Enrollment records identify the participant set.
- Advancement emits auditable events.
- Escrow outcomes are linked to queue outcomes.
- Frontend and backend caches are secondary to contract storage and events.

## Current Scope

The repository contains early contract, SDK, frontend, backend, example, and documentation scaffolding. First-in-first-out advancement is the baseline model. Priority tiers, verifiable randomness, production identity integrations, decentralized governance, and formal verification are roadmap items.

## Related Documents

- [../ARCHITECTURE.md](../ARCHITECTURE.md)
- [queue-lifecycle.md](queue-lifecycle.md)
- [escrow-model.md](escrow-model.md)
- [anti-scalping.md](anti-scalping.md)
- [threat-model.md](threat-model.md)
