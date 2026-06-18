# Developer Onboarding

This guide gets new contributors from a fresh clone to a useful first pull request.

## Prerequisites

- Node.js 18 or newer.
- pnpm 8 or newer.
- Rust 1.75 or newer.
- `wasm32-unknown-unknown` Rust target.
- Docker and Docker Compose.
- Soroban CLI.

## Setup

```bash
git clone https://github.com/lineproof/lineproof.git
cd lineproof
make install
make install-toolchain
```

## First Build

```bash
make build
make test
make lint
```

If a dependency is missing, install that tool rather than editing generated lockfiles or build output.

## Local Network

```bash
make docker-up
make deploy-localnet
make docker-down
```

Use `make docker-clean` when you need to reset local ledger state.

## Repository Map

- `contracts/`: Soroban contracts and Rust tests.
- `sdk/`: TypeScript SDK and SDK tests.
- `frontend/`: Reference React/Vite app.
- `backend/`: Reference Express API.
- `docs/`: Maintainer and integrator documentation.
- `research/`: Domain research for product decisions.
- `examples/`: Example integrations for real-world queue domains.
- `scripts/`: Local deployment and automation helpers.

## Good First Contributions

- Add tests for documented lifecycle or escrow invariants.
- Improve SDK examples when public APIs change.
- Add missing event documentation.
- Tighten research notes with clear protocol implications.
- Fix documentation that overstates current implementation status.

## Pull Request Checklist

- Keep the change focused.
- Update docs for public behavior changes.
- Add or update tests for code changes.
- Run `make test` and `make lint` when practical.
- Include security notes when changing authorization, escrow, identity, or queue ordering.

## Where to Start Reading

1. [../README.md](../README.md)
2. [../ARCHITECTURE.md](../ARCHITECTURE.md)
3. [queue-lifecycle.md](queue-lifecycle.md)
4. [escrow-model.md](escrow-model.md)
5. [threat-model.md](threat-model.md)
