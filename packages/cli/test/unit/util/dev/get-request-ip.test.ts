import { describe, it, expect } from 'vitest';
import type http from 'http';

import getRequestIp from '../../../../src/util/dev/get-request-ip';

describe('getRequestIp', () => {
  it('uses x-forwarded-for header when available', () => {
    const req = {
      headers: { 'x-forwarded-for': '1.1.1.1, 2.2.2.2' },
      connection: { remoteAddress: '9.9.9.9' },
    } as unknown as http.IncomingMessage;
    expect(getRequestIp(req)).toBe('1.1.1.1');
  });

  it('falls back to remote address when header missing', () => {
    const req = {
      headers: {},
      connection: { remoteAddress: '9.9.9.9' },
    } as unknown as http.IncomingMessage;
    expect(getRequestIp(req)).toBe('9.9.9.9');
  });
});
