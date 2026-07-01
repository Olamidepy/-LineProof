# Rate Limiting

LineProof's reference backend applies rate limiting to protect against abuse. The
limits described here apply to the in-process implementation. Production deployments
should use a distributed store (Redis) so limits are enforced across replicas.

## Default Limits

| Route group | Limit | Window |
|---|---|---|
| All routes | 60 requests | 1 minute |
| Write routes (`/enrollments`, `/escrow`) | 20 requests | 1 minute |

## Response Headers

Every API response includes the following headers:

| Header | Description |
|---|---|
| `X-RateLimit-Limit` | Maximum requests allowed in the window |
| `X-RateLimit-Remaining` | Requests remaining before the limit resets |
| `X-RateLimit-Reset` | Unix timestamp when the window resets |
| `Retry-After` | Seconds to wait (only present when the limit is exceeded) |

## Exceeded Limit Response

```json
{
  "error": {
    "message": "Too many requests, please try again later.",
    "status": 429
  }
}
```

HTTP status code: `429 Too Many Requests`.

## Customizing Limits

The `createRateLimiter` factory accepts:

```typescript
createRateLimiter({
  max: 100,        // requests per window
  windowMs: 60000, // 1 minute
  message: 'Custom message',
})
```

## Production Recommendations

- Replace the in-process `Map` with `rate-limit-redis` backed store.
- Apply stricter limits to enrollment and escrow deposit endpoints.
- Apply separate rate limits per operator identity, not just per IP, once
  auth is in place.
- Consider token-bucket or leaky-bucket algorithms for smoother burst handling.
