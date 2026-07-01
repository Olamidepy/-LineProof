import { describe, it, expect, vi } from 'vitest';
import type { Request, Response, NextFunction } from 'express';
import { validateStellarAddress } from '../middleware/validateStellarAddress.js';

function mockReq(body: Record<string, unknown>): Request {
  return { body } as unknown as Request;
}

function mockRes() {
  const json = vi.fn();
  const status = vi.fn().mockReturnValue({ json });
  return { res: { status } as unknown as Response, status, json };
}

describe('validateStellarAddress', () => {
  const VALID_KEY = 'G' + 'A'.repeat(55);
  const INVALID_KEY = 'not-a-stellar-key';

  it('calls next() when field is valid', () => {
    const next = vi.fn() as unknown as NextFunction;
    const mw = validateStellarAddress(['identity']);
    mw(mockReq({ identity: VALID_KEY }), mockRes().res, next);
    expect(next).toHaveBeenCalledOnce();
  });

  it('returns 400 when field is invalid', () => {
    const next = vi.fn() as unknown as NextFunction;
    const { res, status } = mockRes();
    const mw = validateStellarAddress(['identity']);
    mw(mockReq({ identity: INVALID_KEY }), res, next);
    expect(status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it('skips optional fields that are absent', () => {
    const next = vi.fn() as unknown as NextFunction;
    const mw = validateStellarAddress(['identity']);
    mw(mockReq({}), mockRes().res, next);
    expect(next).toHaveBeenCalledOnce();
  });

  it('validates multiple fields', () => {
    const next = vi.fn() as unknown as NextFunction;
    const { res, status } = mockRes();
    const mw = validateStellarAddress(['from', 'to']);
    mw(mockReq({ from: VALID_KEY, to: INVALID_KEY }), res, next);
    expect(status).toHaveBeenCalledWith(400);
  });

  it('passes when all required fields are valid', () => {
    const next = vi.fn() as unknown as NextFunction;
    const mw = validateStellarAddress(['from', 'to']);
    mw(mockReq({ from: VALID_KEY, to: VALID_KEY }), mockRes().res, next);
    expect(next).toHaveBeenCalledOnce();
  });
});
