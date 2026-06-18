# Governance

LineProof is early-stage open-source infrastructure. Governance should stay lightweight while the project is small, but security-sensitive protocol decisions need clear review.

## Principles

- Public decisions for public protocol behavior.
- Security and fairness changes receive extra review.
- Contract state and documented invariants take priority over convenience features.
- Contributors are credited through git history and pull requests, not fabricated contributor lists.
- Governance claims should match the project's actual maturity.

## Roles

### Contributors

Anyone who submits issues, documentation, code, tests, research, reviews, or design feedback.

### Maintainers

Maintainers have repository write access and are responsible for review quality, release hygiene, security process, and roadmap stewardship. Until a dedicated maintainer file exists, GitHub repository permissions are the source of truth for maintainer status.

### Security Reviewers

Security reviewers are maintainers or invited experts who review changes affecting authorization, escrow custody, identity, queue ordering, contract upgrades, or deployment.

## Decision Process

Small documentation, test, and bug-fix changes can be reviewed through normal pull requests.

Changes need a design issue or request for comments when they:

- Change queue ordering or lifecycle semantics.
- Change escrow custody, release, refund, or expiry behavior.
- Change identity binding or duplicate-prevention assumptions.
- Change upgrade authority or governance.
- Introduce a new public SDK surface.
- Affect privacy-sensitive data handling.

## Review Expectations

- At least one maintainer review for ordinary changes.
- At least two reviews for contract changes that affect security or fairness.
- Tests or a written explanation when tests are not practical.
- Documentation updates for public behavior changes.
- Changelog updates for user-visible changes.

## Releases

Before release:

1. CI passes.
2. Changelog is updated.
3. Deployment artifacts or "no deployment" notes are recorded.
4. Security-sensitive changes have completed review.
5. Version tags match package and contract documentation.

## Future Governance

Production deployments should move toward multisig or equivalent shared control. Decentralized governance should only be introduced after the protocol interface, upgrade policy, and security process are mature enough to support it.
