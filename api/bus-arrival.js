/**
 * LTA Singapore DataMall Bus Arrival Proxy API
 * 
 * Fetches real-time bus arrivals from LTA OData Service v3:
 * GET https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode={code}&ServiceNo={no}
 * 
 * Headers:
 *   AccountKey: process.env.LTA_ACCOUNT_KEY
 * 
 * Query Parameters:
 *   - BusStopCode (required): 5-digit bus stop identifier (e.g. "04121", "03223")
 *   - ServiceNo (optional): Filter to a specific bus service (e.g. "7", "147")
 * 
 * Cache: Refreshes every 20 seconds as per LTA specifications.
 */

const DEFAULT_LTA_KEY = '7LSmRIxXTQmd+4o2KB4tFg==';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, AccountKey');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method not allowed. Use GET.' }));
  }

  // Parse query parameters from req.url or req.query
  let busStopCode = '';
  let serviceNo = '';

  if (req.query) {
    busStopCode = req.query.BusStopCode || req.query.busStopCode || '';
    serviceNo = req.query.ServiceNo || req.query.serviceNo || '';
  }

  if (!busStopCode && req.url) {
    try {
      const url = new URL(req.url, 'http://localhost');
      busStopCode = url.searchParams.get('BusStopCode') || url.searchParams.get('busStopCode') || '';
      serviceNo = url.searchParams.get('ServiceNo') || url.searchParams.get('serviceNo') || '';
    } catch {
      // ignore
    }
  }

  if (!busStopCode) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 400;
    return res.end(
      JSON.stringify({
        error: 'Missing required parameter: BusStopCode',
        example: '/api/bus-arrival?BusStopCode=04121&ServiceNo=7'
      })
    );
  }

  const accountKey = process.env.LTA_ACCOUNT_KEY || DEFAULT_LTA_KEY;
  let targetUrl = `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${encodeURIComponent(busStopCode.trim())}`;
  if (serviceNo && serviceNo.trim()) {
    targetUrl += `&ServiceNo=${encodeURIComponent(serviceNo.trim())}`;
  }

  try {
    const ltaResponse = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        AccountKey: accountKey,
        accept: 'application/json'
      }
    });

    if (!ltaResponse.ok) {
      const errorText = await ltaResponse.text();
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = ltaResponse.status;
      return res.end(
        JSON.stringify({
          error: `LTA DataMall API responded with status ${ltaResponse.status}`,
          details: errorText
        })
      );
    }

    const data = await ltaResponse.json();

    // Cache control: LTA DataMall updates every 20 seconds
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, s-maxage=20, stale-while-revalidate=10');
    res.statusCode = 200;
    return res.end(JSON.stringify(data));
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 502;
    return res.end(
      JSON.stringify({
        error: 'Failed to fetch from LTA DataMall service',
        message: error instanceof Error ? error.message : String(error)
      })
    );
  }
}
