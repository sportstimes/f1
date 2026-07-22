import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'
import manifestJSON from '__STATIC_CONTENT_MANIFEST'

const assetManifest = JSON.parse(manifestJSON)

// How long responses stay in the Workers Cache and browser cache (seconds)
const CACHE_TTL = 10800;

export default {
  async fetch(request, env, ctx) {
    try {
      return await handleRequest(request, env, ctx);
    } catch (e) {
      logError(e);
      return new Response('Internal Error', { status: 500 });
    }
  },
};

async function handleRequest(request, env, ctx) {
  const url = new URL(request.url);

  // Purge the Workers Cache for this worker (called by CI after deploys)
  if (request.method === 'POST' && url.pathname === '/__purge') {
    const auth = request.headers.get('Authorization');
    if (!env.PURGE_TOKEN || auth !== `Bearer ${env.PURGE_TOKEN}`) {
      return new Response('Unauthorized', { status: 401 });
    }
    const result = await ctx.cache.purge({ pathPrefixes: ['/'] });
    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 500,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }

  // Redirect HTTP to HTTPS (but not webcal://). The scheme in request.url is
  // not reliable behind Workers Cache, so trust the CF-Visitor header instead.
  const visitorScheme = (request.headers.get('CF-Visitor') || '').includes('"scheme":"http"')
    ? 'http'
    : 'https';
  if (visitorScheme === 'http') {
    url.protocol = 'https:';
    // no-store keeps the redirect out of the cache so it can never shadow the https entry
    return new Response(null, {
      status: 301,
      headers: { Location: url.toString(), 'Cache-Control': 'no-store' },
    });
  }
  url.protocol = 'https:';

  // Replace _q_ with _qualifying_ in the URL path (only for files-f1)
  if (url.hostname === 'files-f1.motorsportcalendars.com' && url.pathname.includes('_q_')) {
    url.pathname = url.pathname.replace(/_q_/g, '_qualifying_');
  }

  try {
    const page = await getAssetFromKV(
      {
        request,
        waitUntil: (promise) => ctx.waitUntil(promise),
      },
      {
        ASSET_NAMESPACE: env.__STATIC_CONTENT,
        ASSET_MANIFEST: assetManifest,
        mapRequestToAsset: () => mapRequestToAsset(new Request(url.toString(), request)),
        // The Workers Cache in front of this worker handles caching
        cacheControl: { bypassCache: true },
      },
    );

    const response = new Response(page.body, page);
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Referrer-Policy', 'unsafe-url');
    response.headers.set('Feature-Policy', 'none');
    response.headers.set('Cache-Control', `public, max-age=${CACHE_TTL}`);

    return response;
  } catch (e) {
    logError(e);
    return new Response(e.message || e.toString(), {
      status: 500,
      headers: { 'Cache-Control': 'no-store' },
    });
  }
}

function logError(e) {
  console.error(`Error: ${e.message}`);
}
