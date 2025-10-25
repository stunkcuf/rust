// Cloudflare Pages Function to fix MIME types
export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);

  // Get the response from the static asset
  const response = await next();

  // Clone the response so we can modify headers
  const newResponse = new Response(response.body, response);

  // Set correct Content-Type based on file extension
  if (url.pathname.endsWith('.css')) {
    newResponse.headers.set('Content-Type', 'text/css; charset=utf-8');
  } else if (url.pathname.endsWith('.js')) {
    newResponse.headers.set('Content-Type', 'application/javascript; charset=utf-8');
  } else if (url.pathname.endsWith('.json')) {
    newResponse.headers.set('Content-Type', 'application/json; charset=utf-8');
  } else if (url.pathname.endsWith('.md')) {
    newResponse.headers.set('Content-Type', 'text/markdown; charset=utf-8');
  } else if (url.pathname.endsWith('.html') || url.pathname === '/' || !url.pathname.includes('.')) {
    newResponse.headers.set('Content-Type', 'text/html; charset=utf-8');
  }

  return newResponse;
}
