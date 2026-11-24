import type { Collection, CollectionSlug } from './types.js';

export const collections: Record<CollectionSlug, Collection> = {
	all: {
		slug: 'all',
		label: 'The complete edit',
		title: 'The OLOYE wardrobe.',
		statement: 'Style on your terms.',
		description:
			'Confident tailoring. Expressive essentials. The details that make it yours. Explore a considered wardrobe for a world in motion.',
		image: {
			key: 'presence',
			alt: 'Black male model in a tan jacket and white trousers',
			position: 'center 10%'
		},
		edition: '01'
	},
	men: {
		slug: 'men',
		label: 'Men',
		title: 'Menswear.',
		statement: 'A presence of your own.',
		description:
			'From relaxed tailoring to the everyday essentials you return to. Modern proportions, a confident point of view.',
		image: {
			key: 'grey-suit',
			alt: 'Black male model wearing a relaxed charcoal suit and white T-shirt',
			position: 'center 35%'
		},
		edition: '02'
	},
	women: {
		slug: 'women',
		label: 'Women',
		title: 'Womenswear.',
		statement: 'Quietly unforgettable.',
		description:
			'Sculptural silhouettes, effortless separates and a little after-dark drama. Pieces to make your own.',
		image: {
			key: 'womenswear',
			alt: 'Black female model with a braided updo wearing ivory separates',
			position: 'center 32%'
		},
		edition: '03'
	},
	'new-arrivals': {
		slug: 'new-arrivals',
		label: 'New Arrivals',
		title: 'New arrivals.',
		statement: 'A new perspective.',
		description:
			'Fresh silhouettes. Considered details. Discover the latest additions to the OLOYE wardrobe — your next chapter starts here.',
		image: {
			key: 'tailoring',
			alt: 'Black male model in an ivory suit with a black shoulder bag',
			position: 'center 28%'
		},
		edition: '04'
	},
	clothing: {
		slug: 'clothing',
		label: 'Clothing',
		title: 'Clothing.',
		statement: 'Made for your world.',
		description:
			'The foundation of a distinctive wardrobe. Tailoring, contemporary denim and expressive layers, from morning to after hours.',
		image: {
			key: 'blue-knit',
			alt: 'Black male model with locs wearing a blue rollneck sweater',
			position: 'center 38%'
		},
		edition: '05'
	},
	footwear: {
		slug: 'footwear',
		label: 'Footwear',
		title: 'Footwear.',
		statement: 'Your next move.',
		description:
			'Sculptural trainers, refined classics and boots with attitude. Good style starts from the ground up.',
		image: { key: 'trainers', alt: 'White sculptural trainer balanced on its toe', fit: 'contain' },
		edition: '06'
	},
	accessories: {
		slug: 'accessories',
		label: 'Accessories',
		title: 'Accessories.',
		statement: 'Consider the details.',
		description:
			'A finishing touch. A different perspective. Bags, timepieces and everyday objects with a lasting impression.',
		image: {
			key: 'accessories',
			alt: 'Black male model wearing a brown jacket beside a cognac weekender bag',
			position: 'center 60%'
		},
		edition: '07'
	},
	sale: {
		slug: 'sale',
		label: 'Sale',
		title: 'The sale edit.',
		statement: 'Good finds. Lasting style.',
		description:
			'A considered selection, with a new reason to discover it. Find distinctive pieces at a different price.',
		image: {
			key: 'city-coat',
			alt: 'Black female model with short hair wearing a brown coat against an oxblood background',
			position: 'center 30%'
		},
		edition: '08'
	}
};

export const collectionNavigation: CollectionSlug[] = [
	'men',
	'women',
	'new-arrivals',
	'clothing',
	'footwear',
	'accessories',
	'sale'
];

export const collectionHref = (slug: CollectionSlug, categories: string[] = []) => {
	const query = new URLSearchParams();
	for (const category of categories) query.append('category', category);
	return `/collections/${slug}${query.size ? `?${query}` : ''}`;
};
