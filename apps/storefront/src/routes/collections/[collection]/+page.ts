import { error } from '@sveltejs/kit';
import { collections } from '#lib/catalogue/collections.js';
import type { CollectionSlug } from '#lib/catalogue/types.js';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if (!Object.hasOwn(collections, params.collection))
		error(404, 'This collection could not be found.');
	return { collection: collections[params.collection as CollectionSlug] };
};
