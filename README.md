# LineProof

Provably fair, non-transferable waiting lists for high-demand services.

LineProof is an open-source protocol built for Stellar and Soroban. It helps organizations run auditable queues for oversubscribed resources such as visa appointments, healthcare services, university admissions, event ticketing, and product launches. Queue positions are bound to participant identities, state transitions are emitted as events, and optional escrow rules make payment release and refunds verifiable.

## Why LineProof Exists

Traditional waiting lists are usually administered in private databases. Applicants cannot independently verify their position, operators can make opaque exceptions, and scalpers can resell access when queue positions behave like transferable assets.

LineProof moves the critical fairness rules into Soroban contracts:

- Queue positions are non-transferable by protocol.
- Enrollment is identity-bound to reduce duplicate entries.
- Queue state changes follow an explicit lifecycle.
- Escrow deposits can be released, refunded, or expired through defined rules.
- Events create an auditable trail for participants, operators, and third-party reviewers.

## Repository Status

This repository is an early implementation scaffold. It contains Soroban contract crates, a TypeScript SDK package, reference frontend and backend applications, examples, CI configuration, and documentation. Some advanced roadmap items, including verifiable randomness, production-grade identity verification, multisig governance, and formal verification, are planned but not complete.

## Architecture

```
participants / operators
          |
          v
frontend and backend reference apps
          |
          v
TypeScript SDK
          |
          v
Soroban contracts on Stellar
          |
          +-- lineproof-queue-factory
          +-- lineproof-queue
          +-- lineproof-enrollment
          +-- lineproof-identity
          +-- lineproof-escrow
```

Core directories:

- `contracts/`: Rust/Soroban workspace for protocol contracts.
- `sdk/`: TypeScript SDK for application integration.
- `frontend/`: Reference React/Vite application.
- `backend/`: Reference Express API.
- `examples/`: Domain-specific sample integrations.
- `docs/`: Architecture, lifecycle, security, testing, and onboarding docs.
- `research/`: Domain research that informs product and protocol design.

See [ARCHITECTURE.md](ARCHITECTURE.md) and [docs/system-overview.md](docs/system-overview.md) for the detailed system model.

## Queue Lifecycle

Queues move through a constrained lifecycle:

1. `Draft`: configuration is prepared before public enrollment.
2. `EnrollmentOpen`: eligible participants can enroll.
3. `EnrollmentClosed`: enrollment is locked and the final participant set is auditable.
4. `AdvancementActive`: positions are advanced according to configured rules.
5. `Closed`: no further enrollment or advancement occurs.

See [docs/queue-lifecycle.md](docs/queue-lifecycle.md) for transition rules, invariants, and failure handling.

## Anti-Scalping Model

LineProof does not mint transferable queue assets. A position is bound to the enrolling identity and transfer checks reject movement to a different identity. This prevents straightforward resale of queue positions while still leaving room for future integrations with stronger off-chain identity verification.

See [docs/anti-scalping.md](docs/anti-scalping.md).

## Escrow Model

Queues can require escrow deposits. Deposits enter an `Active` state and can later become:

- `Released` when the participant is served.
- `Refunded` when the queue is cancelled or the participant is not served.
- `Expired` when a configured recovery period elapses.

See [docs/escrow-model.md](docs/escrow-model.md).

## Quick Start

Prerequisites:

- Node.js 18 or newer
- pnpm 8 or newer
- Rust 1.75 or newer
- `wasm32-unknown-unknown` Rust target
- Docker and Docker Compose for local network work
- Soroban CLI for contract deployment

```bash
git clone https://github.com/lineproof/lineproof.git
cd lineproof
make install
make install-toolchain
make build
make test
```

Start local services:

```bash
make docker-up
make deploy-localnet
```

Create a queue with the SDK:

```typescript
import { AdvancementRule, LineProofClient, NetworkPassphrase } from "@lineproof/sdk";

const client = new LineProofClient({
  networkPassphrase: NetworkPassphrase.TESTNET,
  rpcServerUrl: "https://soroban-testnet.stellar.org",
  privateKey: process.env.STELLAR_PRIVATE_KEY,
});

const factory = await client.deployFactory();

const queueAddress = await factory.createQueue({
  slug: "product-launch-001",
  name: "Product Launch #001",
  maxPositions: 500,
  enrollmentOpenAt: Math.floor(Date.now() / 1000),
  enrollmentCloseAt: Math.floor(Date.now() / 1000) + 86400,
  advancementRule: AdvancementRule.FIRST_IN_FIRST_OUT,
  escrowRequired: true,
  escrowAsset: "native",
  escrowAmountReadable: 150,
});

console.log(queueAddress);
```

## Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md): system architecture and contract boundaries.
- [ROADMAP.md](ROADMAP.md): planned milestones.
- [CHANGELOG.md](CHANGELOG.md): unreleased and released changes.
- [GOVERNANCE.md](GOVERNANCE.md): decision-making and maintainer process.
- [CONTRIBUTING.md](CONTRIBUTING.md): contributor workflow.
- [docs/system-overview.md](docs/system-overview.md): protocol overview.
- [docs/queue-lifecycle.md](docs/queue-lifecycle.md): queue states and transitions.
- [docs/anti-scalping.md](docs/anti-scalping.md): non-transferability and abuse resistance.
- [docs/escrow-model.md](docs/escrow-model.md): escrow states, release, refund, and expiry.
- [docs/security-considerations.md](docs/security-considerations.md): security properties and limitations.
- [docs/threat-model.md](docs/threat-model.md): attacker goals, assets, boundaries, and mitigations.
- [docs/sdk-architecture.md](docs/sdk-architecture.md): SDK layers and design principles.
- [docs/testing-strategy.md](docs/testing-strategy.md): test coverage expectations.
- [docs/deployment-strategy.md](docs/deployment-strategy.md): local, testnet, and production deployment process.
- [docs/developer-onboarding.md](docs/developer-onboarding.md): setup and first contribution guide.
- [docs/use-cases.md](docs/use-cases.md): domain-specific integration patterns.

Research notes live in `research/` for healthcare waitlists, visa appointment systems, university admissions, event ticketing, and limited product launches.

## Contributing

Contributions are welcome. Start with [docs/developer-onboarding.md](docs/developer-onboarding.md), then follow [CONTRIBUTING.md](CONTRIBUTING.md). Security reports should follow [SECURITY.md](SECURITY.md), not public issues.

## License

LineProof is released under the [MIT License](LICENSE).
