# SDK Architecture

The TypeScript SDK gives integrators a typed way to work with LineProof contracts. It should remain a thin protocol client, not a hidden policy engine.

## Package Layout

| File | Responsibility |
|------|----------------|
| `sdk/src/client.ts` | Shared network, RPC, signing, and contract invocation configuration. |
| `sdk/src/queue.ts` | Queue creation, lifecycle transitions, advancement, and position queries. |
| `sdk/src/enrollment.ts` | Enrollment calls and enrollment proof helpers. |
| `sdk/src/identity.ts` | Identity binding and transfer eligibility checks. |
| `sdk/src/escrow.ts` | Deposit, release, refund, expiry, and escrow record queries. |
| `sdk/src/types.ts` | Public domain types and enums. |
| `sdk/src/index.ts` | Public exports. |

## Design Principles

- Contract state is authoritative.
- SDK methods should map closely to contract entry points.
- Public types should use descriptive names and avoid abbreviations.
- Methods that perform writes should make authorization requirements obvious.
- Query helpers may combine multiple reads, but must document derived values.
- SDK errors should preserve enough context to debug failed contract calls.

## Client Layers

```
application code
      |
      v
domain clients: QueueClient, EnrollmentClient, IdentityClient, EscrowClient
      |
      v
LineProofClient shared transport and signer configuration
      |
      v
Soroban RPC and contract invocations
```

## Current Scope

The SDK scaffold defines the intended client surface and type model. Maintainers should treat methods as integration contracts and update `docs/api-reference/sdk.md` whenever public signatures change.

## Future Work

- Add generated bindings from compiled Soroban contract specs.
- Add pagination helpers for queue and event reads.
- Add typed event decoding.
- Add browser-safe and Node-safe signer adapters.
- Add integration tests against localnet.
