import { error } from '@sveltejs/kit';
import { information } from '#lib/content/information.js';
import type { PageLoad } from './$types';
export const load: PageLoad = ({ params }) => {
	const content = information[params.slug];
	if (!content || !Object.hasOwn(information, params.slug))
		error(404, 'This information page could not be found.');
	return { content, photography: params.slug === 'photography' };
};
