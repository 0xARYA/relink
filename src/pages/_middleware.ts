import {NextMiddleware, NextResponse} from 'next/server';

import type {ResolveRequestBody, ResolveRequestHeaders, ResolveResponse} from './api/link/resolve';

import aliasSchema from '../schemas/common/aliasSchema';

// eslint-disable-next-line import/prefer-default-export
export const middleware: NextMiddleware = async request => {
  try {
    // ensure we don't interupt valid [non-shortened link] requests.
    if (request.method !== 'GET' || request.page.name !== undefined) return NextResponse.next();

    const pathSegments = request.nextUrl.pathname.split('/', 3);

    if (pathSegments.length > 2) return NextResponse.next();

    const alias = pathSegments[1];

    // no alias, no redirect.
    if (!alias || !aliasSchema.isValidSync(alias)) return NextResponse.next();

    const resolveAPIURL = new URL('/api/link/resolve', request.url).toString();

    const resolveAPIResponse = await fetch(resolveAPIURL, {
      method: 'POST',
      headers: <ResolveRequestHeaders>{
        authorization: `Bearer ${process.env.INTERNAL_API_ACCESS_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(<ResolveRequestBody>{
        alias,
        visitor: {
          referrer: request.referrer,
          deviceType: request.ua?.device.type,
          country: request.geo?.country,
        },
      }),
    });

    const resolved = (await resolveAPIResponse.json()) as ResolveResponse;

    if (!resolved.success) return NextResponse.redirect(new URL('/404', request.url), 302);

    return NextResponse.redirect(resolved.destination, 302);
  } catch (error: unknown) {
    console.error(error);

    return NextResponse.next();
  }
};
