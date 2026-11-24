import { error, redirect } from '@sveltejs/kit';
import { previews } from '#lib/content/home.js';
import { collections } from '#lib/catalogue/collections.js';
import { productById } from '#lib/catalogue/products.js';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params, url }) => {
	if (productById.has(params.slug)) redirect(308, `/products/${params.slug}${url.search}`);
	if (Object.hasOwn(collections, params.slug))
		redirect(308, `/collections/${params.slug}${url.search}`);
	const preview = previews[params.slug];
	if (!preview || !Object.hasOwn(previews, params.slug))
		error(404, 'This preview could not be found.');
	return { preview };
};
