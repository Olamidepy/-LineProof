import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LineProofClient } from '../src/client';
import { SDKError, NetworkPassphrase } from '../src/types';

vi.mock('@stellar/stellar-sdk', async () => {
  const actual = await vi.importActual<typeof import('@stellar/stellar-sdk')>('@stellar/stellar-sdk');
  return {
    ...actual,
    Horizon: {
      Server: vi.fn(() => ({
        loadAccount: vi.fn(async () => ({ sequence: 1, balances: [] })),
        submitTransaction: vi.fn(async () => ({ hash: 'mockhash' })),
      })),
    },
    Keypair: {
      ...actual.Keypair,
      fromSecret: vi.fn(() => ({
        publicKey: () => 'GABC1234567890ABCDEF',
        secret: () => 'SABC',
        sign: vi.fn(),
      })),
      random: vi.fn(() => ({
        publicKey: () => 'GRANDOM1',
        secret: () => 'SRANDOM',
      })),
    },
    Networks: {
      TESTNET: NetworkPassphrase.TESTNET,
      PUBLIC: NetworkPassphrase.MAINNET,
      STANDALONE: NetworkPassphrase.STANDALONE,
      FUTURENET: NetworkPassphrase.FUTURENET,
    },
    BASE_FEE: '100',
  };
});

describe('LineProofClient constructor', () => {
  it('throws SDKError for unrecognised network passphrase', () => {
    expect(() =>
      new LineProofClient({
        rpcServerUrl: 'http://localhost:8000',
        networkPassphrase: 'Unknown Network',
      })
    ).toThrow(SDKError);
  });

  it('creates client with valid TESTNET passphrase', () => {
    const client = new LineProofClient({
      rpcServerUrl: 'http://localhost:8000',
      networkPassphrase: NetworkPassphrase.TESTNET,
    });
    expect(client.getNetworkPassphrase()).toBe(NetworkPassphrase.TESTNET);
  });
});

describe('LineProofClient.deployFactory', () => {
  it('throws MISSING_CREDENTIALS when no privateKey is set', async () => {
    const client = new LineProofClient({
      rpcServerUrl: 'http://localhost:8000',
      networkPassphrase: NetworkPassphrase.TESTNET,
    });
    await expect(client.deployFactory()).rejects.toMatchObject({ code: 'MISSING_CREDENTIALS' });
  });

  it('returns a contract-ID-like string when privateKey is provided', async () => {
    const client = new LineProofClient({
      rpcServerUrl: 'http://localhost:8000',
      networkPassphrase: NetworkPassphrase.TESTNET,
      privateKey: 'SABC',
    });
    const id = await client.deployFactory();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });
});

describe('LineProofClient.resolveFactory', () => {
  it('throws FACTORY_NOT_DEPLOYED before deployFactory is called', () => {
    const client = new LineProofClient({
      rpcServerUrl: 'http://localhost:8000',
      networkPassphrase: NetworkPassphrase.TESTNET,
    });
    expect(() => client.resolveFactory()).toThrow(SDKError);
  });
});
