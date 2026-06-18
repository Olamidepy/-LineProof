# SDK Reference

## LineProofClient

Main entry point for LineProof integration.

### Constructor

```typescript
new LineProofClient(config: LineProofConfig)
```

**Parameters:**
- `networkPassphrase`: Stellar network passphrase (TESTNET/PUBLIC/STANDALONE)
- `rpcServerUrl`: Soroban RPC endpoint URL
- `privateKey`: Optional signing key for admin operations
- `publicKey`: Optional public key for read-only operations
- `timeoutMs`: Request timeout (default: 30000)
- `maxRetries`: Request retry count (default: 3)

### Methods

| Method | Description |
|--------|-------------|
| `deployFactory()` | Deploy new QueueFactory contract |
| `getPublicKey()` | Get configured signing key |
| `getNetworkPassphrase()` | Get network configuration |

---

## QueueClient

### `createQueue(params: QueueDeploymentParams) -> Promise<string>`

Deploy a new queue instance.

**Parameters:**
- `slug`: Unique queue identifier
- `name`: Human-readable queue name
- `maxPositions`: Maximum queue capacity
- `enrollmentOpenAt`: Unix timestamp for enrollment start
- `enrollmentCloseAt`: Unix timestamp for enrollment end
- `advancementRule`: FIFO, PRIORITY, or VRF
- `escrowRequired`: Whether payments are required
- `escrowAsset`: Asset contract ID for escrow
- `escrowAmountReadable`: Amount in readable units

### `enroll(queueId: string) -> Promise<EnrollmentProof>`

Enroll in a queue with identity binding.

### `advance(queueId: string, batchSize: number) -> Promise<Vec<u32>>`

Advance positions (admin only).

### `getPosition(positionId: number) -> Promise<Position | null>`

Query a position by ID.

### `getConfig(queueId: string) -> Promise<QueueConfig>`

Get queue configuration.

### `getOwner() -> string`

Get queue owner/admin address.

---

## EscrowClient

### `deposit(queueId: string, amount: bigint, asset: string) -> Promise<void>`

Deposit funds into escrow.

### `release(queueId: string, identity: string) -> Promise<void>`

Release escrow funds to admin (admin only).

### `refund(queueId: string, identity: string) -> Promise<void>`

Refund escrow funds to participant (admin only).

### `expire(queueId: string) -> Promise<void>`

Expire escrow after hold period (participant).

### `getRecord(queueId: string, identity: string) -> Promise<EscrowRecord | null>`

Query escrow record.

---

## IdentityClient

### `bind(queueId: string) -> Promise<void>`

Bind identity to queue.

### `unbind(queueId: string) -> Promise<void>`

Remove identity binding.

### `isBound(queueId: string, identity: string) -> Promise<boolean>`

Check if identity is bound.

### `canTransfer(from: string, to: string, queueId: string) -> Promise<boolean>`

Check transfer eligibility (always false for different identities).

---

## Types

### `PositionStatus`
- `Pending` - Waiting for advancement
- `Advanced` - Position has advanced
- `Expired` - Position expired
- `Cancelled` - Position cancelled

### `EscrowStatus`
- `Active` - Funds held
- `Released` - Funds released to admin
- `Refunded` - Funds returned to participant
- `Expired` - Hold period elapsed