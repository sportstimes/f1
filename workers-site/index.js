import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'

const DEBUG = false;

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

async function handleEvent(event) {
  const url = new URL(event.request.url);

  // Redirect HTTP to HTTPS (but not webcal://)
  if (url.protocol === 'http:') {
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }

  const cache = caches.default;

  // Check cache first
  let cachedResponse = await cache.match(event.request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const page = await getAssetFromKV(event);

    // Create response with modified headers
    const response = new Response(page.body, page);
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("Referrer-Policy", "unsafe-url");
    response.headers.set("Feature-Policy", "none");
    response.headers.set('Cache-Control', 'public, max-age=10800');

    // Cache the response
    event.waitUntil(cache.put(event.request, response.clone()));

    return response;
  } catch (e) {
    logError(e);  // Log error
    return new Response(e.message || e.toString(), { status: 500 });
  }
}

function logError(e) {
  console.error(`Error: ${e.message}`);
}

/**
 * Here's one example of how to modify a request to
 * remove a specific prefix, in this case `/docs` from
 * the url. This can be useful if you are deploying to a
 * route on a zone, or if you only want your static content
 * to exist at a specific path.
 */
function handlePrefix(prefix) {
  return request => {
    // compute the default (e.g. / -> index.html)
    let defaultAssetKey = mapRequestToAsset(request)
    let url = new URL(defaultAssetKey.url)

    // strip the prefix from the path for lookup
    url.pathname = url.pathname.replace(prefix, '/')

    // inherit all other props from the default request
    return new Request(url.toString(), defaultAssetKey)
  }
}