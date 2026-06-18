# Roadmap

This roadmap describes planned work for LineProof. Dates are intentionally omitted until maintainers commit to a release schedule.

## Phase 1: Protocol Foundation

- Stabilize queue lifecycle states and transition names.
- Keep contract crates organized under `contracts/`.
- Keep TypeScript SDK types aligned with contract behavior.
- Maintain reference frontend and backend applications as examples, not sources of truth.
- Document system overview, queue lifecycle, escrow, anti-scalping, security, testing, and onboarding.

## Phase 2: Developer Experience

- Generate SDK bindings from compiled Soroban contract specs.
- Add localnet integration tests for SDK calls.
- Publish deployment manifests for localnet and testnet.
- Add event decoding and pagination helpers.
- Improve examples for healthcare scheduling, visa appointments, event ticketing, and product launches.

## Phase 3: Fairness and Identity Hardening

- Add priority-tier queue support with explicit published inputs.
- Evaluate verifiable randomness for lottery-style queues.
- Add stronger duplicate-resistance options through privacy-preserving attestations.
- Expand threat-model coverage for Sybil resistance and operator compromise.
- Add property-based tests for queue and escrow state machines.

## Phase 4: Escrow and Operations

- Exercise escrow flows against realistic asset contracts.
- Add refund reason codes and clearer cancellation policies.
- Add operator runbooks for stalled queues, failed releases, and incident response.
- Add observability for event indexers and reference backend services.

## Phase 5: Production Readiness

- Complete independent smart-contract audit.
- Move production admin authority to multisig or equivalent governance.
- Publish mainnet deployment checklist and release artifacts.
- Define compatibility and migration policy for contract upgrades.
- Prepare additional SDKs only after the TypeScript SDK and contract API are stable.
