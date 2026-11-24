import { error } from '@sveltejs/kit';
import { productById } from '#lib/catalogue/products.js';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const product = productById.get(params.slug);
	if (!product) error(404, 'This piece could not be found.');
	return { product };
};
