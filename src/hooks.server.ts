import { PUBLIC_CUSTOM_DOMAIN, PUBLIC_PRODUCTION_BRANCH } from '$env/static/public';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) =>
	await resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace(
				/__domain/g,
				process.env?.CF_PAGES_BRANCH === PUBLIC_PRODUCTION_BRANCH ? PUBLIC_CUSTOM_DOMAIN : ''
			)
	})) satisfies Handle;
