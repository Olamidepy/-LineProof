# API Reference — Escrow

Base path: `/api/escrow`

---

## POST /api/escrow/deposit

Creates an escrow hold for a queue participant.

**Request body**

```json
{
  "queueId": "sneaker-drop-001",
  "identity": "GABC...XYZ",
  "amount": 150,
  "asset": "USDC",
  "holdDays": 30
}
```

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `queueId` | string | ✓ | |
| `identity` | string | ✓ | |
| `amount` | number | ✓ | must be > 0 |
| `asset` | string | ✓ | e.g. `XLM`, `USDC` |
| `holdDays` | integer | | defaults to 30 |

**Response 201**

```json
{
  "id": "sneaker-drop-001:GABC...XYZ",
  "queueId": "sneaker-drop-001",
  "identity": "GABC...XYZ",
  "amount": 150,
  "asset": "USDC",
  "status": "Active",
  "createdAt": "2025-07-01T10:00:00.000Z",
  "expiresAt": "2025-07-31T10:00:00.000Z"
}
```

**Response 400** — validation error

**Response 409** — duplicate escrow record for same (queueId, identity)

---

## POST /api/escrow/release

Releases an active escrow to the operator.

**Request body**

```json
{ "escrowId": "sneaker-drop-001:GABC...XYZ" }
```

**Response 200** — updated escrow record with `status: "Released"` and `releasedAt`

**Response 404** — escrow not found

**Response 409** — escrow is not in Active status

---

## POST /api/escrow/refund

Refunds an active escrow back to the participant.

**Request body** — same as release

**Response 200** — updated escrow record with `status: "Refunded"`

---

## POST /api/escrow/expire

Marks an escrow as expired (only valid after `expiresAt`).

**Request body** — same as release

**Response 200** — updated escrow record with `status: "Expired"`

**Response 409** — escrow is not in Active status

**Response 422** — escrow has not yet elapsed

---

## GET /api/escrow/:id

Retrieves an escrow record by ID.

**Response 200** — escrow record

**Response 404** — not found
