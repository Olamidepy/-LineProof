import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response, NextFunction } from 'express';
import { createRateLimiter } from '../middleware/rateLimiter.js';

function mockReq(ip = '127.0.0.1'): Request {
  return { ip, socket: { remoteAddress: ip }, headers: {} } as unknown as Request;
}

function mockRes(): { res: Response; status: ReturnType<typeof vi.fn>; json: ReturnType<typeof vi.fn>; headers: Record<string, string | number> } {
  const headers: Record<string, string | number> = {};
  const json = vi.fn();
  const status = vi.fn().mockReturnValue({ json });
  const res = {
    setHeader: (k: string, v: string | number) => { headers[k] = v; },
    status,
    headers,
  } as unknown as Response;
  return { res, status, json, headers };
}

describe('createRateLimiter', () => {
  it('allows requests under the limit', () => {
    const limiter = createRateLimiter({ max: 3, windowMs: 60_000 });
    const req = mockReq('10.0.0.1');
    const next = vi.fn() as unknown as NextFunction;

    for (let i = 0; i < 3; i++) {
      const { res } = mockRes();
      limiter(req, res, next);
    }
    expect(next).toHaveBeenCalledTimes(3);
  });

  it('blocks requests over the limit with 429', () => {
    const limiter = createRateLimiter({ max: 2, windowMs: 60_000 });
    const req = mockReq('10.0.0.2');
    const next = vi.fn() as unknown as NextFunction;

    for (let i = 0; i < 2; i++) {
      const { res } = mockRes();
      limiter(req, res, next);
    }

    const { res, status } = mockRes();
    limiter(req, res, next);
    expect(status).toHaveBeenCalledWith(429);
    expect(next).toHaveBeenCalledTimes(2); // not called on the 3rd
  });

  it('sets X-RateLimit headers on each response', () => {
    const limiter = createRateLimiter({ max: 10, windowMs: 60_000 });
    const req = mockReq('10.0.0.3');
    const next = vi.fn() as unknown as NextFunction;
    const { res, headers } = mockRes();
    limiter(req, res, next);
    expect(headers['X-RateLimit-Limit']).toBe(10);
    expect(typeof headers['X-RateLimit-Remaining']).toBe('number');
    expect(typeof headers['X-RateLimit-Reset']).toBe('number');
  });
});
