import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ message: 'URL is required' }, { status: 400 });
    }

    let currentUrl = url;
    let redirectCode: number | undefined;
    let response;

    // use manual redirect to capture redirect status codes
    try {
      response = await fetch(currentUrl, { method: 'HEAD', redirect: 'manual' });
    } catch (err) {
      return NextResponse.json({ ok: false, error: (err instanceof Error ? err.message : String(err)) });
    }

    // if we got a redirect, capture it and follow manually
    if (response && response.status >= 300 && response.status < 400) {
      redirectCode = response.status;
      const location = response.headers.get('location');
      if (location) {
        // resolve relative URLs
        try {
          currentUrl = new URL(location, currentUrl).toString();
        } catch {
          currentUrl = location;
        }
        // follow the redirect
        try {
          response = await fetch(currentUrl, { method: 'HEAD', redirect: 'manual' });
        } catch (err) {
          return NextResponse.json({
            ok: false,
            finalUrl: currentUrl,
            redirectCode,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      }
    }

    // if HEAD failed with 405/501, try GET
    if (response && !response.ok && (response.status === 405 || response.status === 501)) {
      try {
        response = await fetch(currentUrl, { redirect: 'manual' });
      } catch (err) {
        return NextResponse.json({
          ok: false,
          finalUrl: currentUrl,
          redirectCode,
          error: err instanceof Error ? err.message : String(err),
        });
      }

      // if GET returned a redirect, capture and follow
      if (response && response.status >= 300 && response.status < 400) {
        if (!redirectCode) redirectCode = response.status;
        const location = response.headers.get('location');
        if (location) {
          try {
            currentUrl = new URL(location, currentUrl).toString();
          } catch {
            currentUrl = location;
          }
          try {
            response = await fetch(currentUrl, { redirect: 'manual' });
          } catch (err) {
            return NextResponse.json({
              ok: false,
              finalUrl: currentUrl,
              redirectCode,
              error: err instanceof Error ? err.message : String(err),
            });
          }
        }
      }
    }

    return NextResponse.json({
      ok: response?.ok === true,
      status: response?.status,
      finalUrl: response?.url || currentUrl,
      redirectCode: redirectCode || undefined,
    });
  } catch (error) {
    console.error('url-check error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
