import type { Handle } from '@sveltejs/kit';
import * as dotenv from 'dotenv';

dotenv.config();

const { PRODUCTION_BRANCH, CUSTOM_DOMAIN } = process.env;

export const handle = (async ({ event, resolve }) =>
	await resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace(
				/__domain/g,
				process.env?.CF_PAGES_BRANCH === PRODUCTION_BRANCH ? CUSTOM_DOMAIN : ''
			)
	})) satisfies Handle;
