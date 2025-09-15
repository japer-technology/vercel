import type http from 'http';

export default function getRequestIp(req: http.IncomingMessage): string {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string') {
    const [firstIp] = forwardedFor.split(',');
    if (firstIp) return firstIp.trim();
  } else if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
    const [firstIp] = forwardedFor[0].split(',');
    if (firstIp) return firstIp.trim();
  }
  return req.connection.remoteAddress || '127.0.0.1';
}
