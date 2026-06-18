# Fairness Invariants

This document records the fairness properties LineProof aims to enforce. Some invariants are already represented in the scaffolded contracts; others are release criteria for production readiness.

## Safety Invariants

### No Transfer After Assignment

A queue position must not be transferable to a different identity. Transfer attempts should fail and, where supported, emit an event that can be reviewed by operators and auditors.

### Single Enrollment Per Identity Per Queue

An identity must not hold more than one active enrollment record in the same queue.

### Capacity Bound

The number of active positions must not exceed the queue's configured capacity.

### Valid Lifecycle Transitions

Queues must move only through documented lifecycle transitions. `Closed` is terminal.

### Escrow Terminality

An escrow record can end in `Released`, `Refunded`, or `Expired`, but it must not reach more than one terminal state.

## Liveness Goals

- A valid enrollment during an open enrollment window should succeed if capacity remains.
- Batch advancement should make progress while pending positions remain.
- Participants with active escrow should have a release, refund, or expiry path.

## Fairness Goals

- Ordering inputs must be visible before enrollment closes.
- Advancement rules must not include hidden priority channels.
- Admin actions must be logged through contract events.
- Auditors should be able to reconstruct the queue from storage and events.

## Threat Coverage

| Threat | Relevant invariant |
|--------|--------------------|
| Scalping | No transfer after assignment. |
| Duplicate enrollment | Single enrollment per identity per queue. |
| Queue stuffing | Capacity bound. |
| Arbitrary lifecycle edits | Valid lifecycle transitions. |
| Escrow abuse | Escrow terminality. |
| Opaque favoritism | Public ordering inputs and events. |

## Verification Targets

Future formal or property-based testing should focus on:

1. Queue lifecycle transition validity.
2. Position uniqueness and capacity bounds.
3. Enrollment uniqueness for each identity and queue.
4. Escrow state machine terminality.
5. Advancement progress and no duplicate advancement.
