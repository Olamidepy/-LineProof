# Queue Lifecycle

This document defines the canonical queue lifecycle for LineProof. Contract code, SDK methods, backend routes, frontend labels, and docs should use these state names consistently.

## States

| State | Purpose | Allowed participant action | Allowed operator action |
|-------|---------|----------------------------|-------------------------|
| `Draft` | Queue exists but is not accepting enrollment. | None. | Update pre-launch configuration if supported by the contract version. |
| `EnrollmentOpen` | Participants can join the queue. | Enroll, deposit escrow if required, inspect status. | Monitor enrollments and close enrollment. |
| `EnrollmentClosed` | Participant set is locked. | Inspect status and escrow record. | Begin advancement or cancel according to policy. |
| `AdvancementActive` | Positions are being served. | Inspect status, claim service when advanced, request refund where policy allows. | Advance batches and release or refund escrow. |
| `Closed` | Queue is finalized. | Inspect final audit trail. | No normal state transitions. |

## State Transitions

```
Draft
  |
  | open_enrollment
  v
EnrollmentOpen
  |
  | close_enrollment
  v
EnrollmentClosed
  |
  | start_advancement / advance
  v
AdvancementActive
  |
  | close
  v
Closed
```

Cancellation paths should be explicit in the contract version that supports them. If a queue is cancelled after escrow deposits exist, each active escrow record must have a refund or expiry path.

## Enrollment Rules

- Enrollment is only valid in `EnrollmentOpen`.
- A queue must reject enrollment after `EnrollmentClosed`.
- Each identity can hold at most one active position per queue.
- The queue must not exceed `maxPositions`.
- If escrow is required, the participant must satisfy escrow requirements before the position is considered serviceable.

## Advancement Rules

The initial implementation focuses on first-in-first-out advancement. Future implementations may support priority tiers or verifiable randomness, but those modes must publish their ordering inputs before enrollment closes.

Advancement must preserve these invariants:

- A position cannot advance before it exists.
- A position cannot advance twice.
- A cancelled, expired, or refunded position cannot be treated as served.
- Batch advancement must be bounded to avoid unbounded storage work.
- Advancement events must identify the queue and position IDs affected.

## Queue State Invariants

- `Closed` is terminal.
- The enrollment count cannot exceed queue capacity.
- The advancement cursor cannot move beyond the number of enrolled positions.
- Position IDs are unique within a queue.
- Events must be sufficient to reconstruct the state transition history.

## Failure Handling

If an advancement transaction fails, no partial state should be considered final unless the contract has explicitly emitted the relevant events and committed storage updates. Integrators should treat transaction success, storage state, and emitted events as the source of truth.

If an operator becomes unavailable, participants with active escrow should have a defined expiry or refund route in the escrow contract version used by the queue.
