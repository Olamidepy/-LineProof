# Error Codes

LineProof's backend API returns structured error responses for all failure cases.

## Response Format

```json
{
  "error": {
    "message": "Human-readable description of the error.",
    "status": 400,
    "path": "/api/enrollments/enroll",
    "timestamp": "2025-07-01T10:00:00.000Z"
  }
}
```

In `development` mode, a `stack` field is also included.

## HTTP Status Codes

| Status | Meaning | Common cause |
|--------|---------|--------------|
| `400 Bad Request` | Request body failed schema validation | Missing required field, wrong type |
| `404 Not Found` | Resource does not exist | Queue, enrollment, or escrow ID not found |
| `409 Conflict` | State conflict | Duplicate enrollment, duplicate escrow, invalid state transition |
| `422 Unprocessable Entity` | Logical rejection | Trying to expire an escrow that hasn't elapsed yet |
| `429 Too Many Requests` | Rate limit exceeded | See [rate-limiting.md](rate-limiting.md) |
| `500 Internal Server Error` | Unexpected server error | Unhandled exception |

## Validation Error Format

When a request body fails Zod validation (status `400`), the response includes
an `issues` array:

```json
{
  "message": "Invalid request",
  "issues": [
    {
      "code": "too_small",
      "minimum": 1,
      "path": ["queueId"],
      "message": "String must contain at least 1 character(s)"
    }
  ]
}
```

## Contract Error Mapping

Soroban contracts use `panic!` with descriptive messages. The backend SDK
layer should translate known panic messages to the appropriate HTTP status codes:

| Contract panic message | HTTP status |
|---|---|
| `duplicate enrollment` | `409` |
| `identity revoked` | `403` |
| `escrow not active` | `409` |
| `existing escrow record` | `409` |
| `amount must be positive` | `400` |
| `amount outside configured bounds` | `422` |
| `queue not initialized` | `404` |
| `not expired` | `422` |
| `enrollment must be closed before advancing` | `409` |
