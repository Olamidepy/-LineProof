# Glossary

Key terms used throughout LineProof documentation and code.

---

**Advancement**
The process of moving queue positions from `Pending` to `Advanced` status. Advancement follows the queue's configured rule (FIFO, Priority, or VRF) and is gated by admin authorization.

**Anti-scalping**
The protocol property that prevents queue positions from being resold. Positions are bound to the enrolling identity; any attempted transfer is rejected by the identity contract.

**Auditable trail**
The sequence of on-chain events emitted by LineProof contracts that allows any observer to reconstruct queue history independently of the operator.

**Binding**
The association between a Stellar account address and one or more queue slugs, recorded in the identity contract. A bound identity cannot transfer its queue position.

**Contract ID**
The on-chain address of a deployed Soroban contract. Contract IDs are stable after deployment and serve as the canonical reference for a queue.

**Duplicate behavior**
The policy applied when an identity attempts to enroll more than once in the same queue. Configurable as `Reject` (default), `GrantWaitingList`, or `OverrideExpired`.

**Enrollment proof**
A record emitted at enrollment time containing the identity, queue ID, timestamp, and a proof hash. Used by auditors to verify enrollment happened at a specific point in time.

**Escrow**
An on-chain fund hold associated with a queue enrollment. Escrow moves through `Active → Released | Refunded | Expired` states defined in the escrow contract.

**Factory**
The `lineproof-queue-factory` contract that deploys and registers queue instances. Operators publish the factory address so participants can verify queues originate from a known LineProof release.

**FIFO**
First-In, First-Out. The default advancement rule that serves participants in enrollment order.

**Identity contract**
The `lineproof-identity` contract that stores address-to-queue bindings and enforces non-transferability.

**Operator**
An organization or individual that deploys and manages a LineProof queue. Operators hold admin keys and are responsible for queue configuration and lifecycle decisions.

**Position**
A numbered slot in a queue assigned at enrollment. Positions have a status: `Pending`, `Advanced`, `Expired`, or `Cancelled`.

**Queue slug**
A short, URL-safe string that uniquely identifies a queue within a factory (e.g. `visa-batch-a-2025`).

**Soroban**
The smart contract platform on the Stellar network. LineProof contracts are compiled to WASM and deployed to Soroban.

**VRF**
Verifiable Random Function. A planned advancement rule that uses verifiable randomness to assign positions fairly in lottery-style queues.
