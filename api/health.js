/**
 * Health check endpoint for monitoring API status.
 * Compatible with Vercel serverless functions and Node.js HTTP handlers.
 */
export default async function handler(req, res) {
  // Support CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  const hasLtaKey = Boolean(process.env.LTA_ACCOUNT_KEY);

  const healthData = {
    status: 'healthy',
    uptimeSeconds: Math.floor(process.uptime ? process.uptime() : 0),
    timestamp: new Date().toISOString(),
    service: 'metro-transit-api',
    endpoints: [
      { path: '/api/health', method: 'GET', description: 'API health monitoring' },
      { path: '/api/bus-arrival', method: 'GET', description: 'LTA Singapore Bus Arrival data (query: BusStopCode, ServiceNo)' }
    ],
    config: {
      ltaConfigured: hasLtaKey || true // Fallback key is embedded
    }
  };

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  return res.end(JSON.stringify(healthData, null, 2));
}
