import { homepageProducts as products } from '#lib/catalogue/products.js';
import { formatPrice } from '#lib/catalogue/categories.js';
import { collectionHref } from '#lib/catalogue/collections.js';
import type { ImageKey } from '#lib/content/photography.js';
export type { ImageKey } from '#lib/content/photography.js';
export { products, formatPrice };

export const productCaptions: Record<string, string> = {
	'ivory-tailoring': 'Relaxed tailoring',
	'studio-overshirt': 'Elevated essentials',
	'relaxed-jersey': 'Everyday, considered',
	'city-loafer': 'Modern footwear'
};

export const collections = [
	{
		id: 'men',
		label: 'Menswear',
		line: 'A new way to carry yourself.',
		image: 'menswear',
		alt: 'Male model in a patterned open-collar shirt, pale shorts and white sneakers',
		number: '01'
	},
	{
		id: 'women',
		label: 'Womenswear',
		line: 'Quiet confidence. Lasting impression.',
		image: 'womenswear',
		alt: 'Female model with a braided updo in a relaxed ivory outfit',
		number: '02'
	},
	{
		id: 'footwear',
		label: 'Footwear',
		line: 'Make your next move.',
		image: 'trainers',
		alt: 'Sculptural white trainer balanced on its toe against a black background',
		number: '03'
	},
	{
		id: 'accessories',
		label: 'Accessories',
		line: 'The details make the difference.',
		image: 'accessories',
		alt: 'Male model in a tan jacket beside a structured brown bag',
		number: '04'
	}
] as const;

export const navigation = [
	{
		label: 'Men',
		slug: 'men',
		links: [
			{ label: 'Tailoring', href: collectionHref('men', ['suits']) },
			{ label: 'Shirts & tops', href: collectionHref('men', ['shirts', 'streetwear']) },
			{ label: 'Trousers & denim', href: collectionHref('men', ['trousers', 'denim']) },
			{ label: 'Jackets & outerwear', href: collectionHref('men', ['jackets', 'coats']) }
		]
	},
	{
		label: 'Women',
		slug: 'women',
		links: [
			{ label: 'Dresses', href: collectionHref('women', ['dresses']) },
			{ label: 'Modern separates', href: collectionHref('women', ['shirts', 'trousers', 'denim']) },
			{ label: 'Knitwear', href: collectionHref('women', ['knitwear']) },
			{ label: 'Jackets & outerwear', href: collectionHref('women', ['jackets', 'coats']) }
		]
	},
	{
		label: 'Clothing',
		slug: 'clothing',
		links: [
			{ label: 'Suits & shirts', href: collectionHref('clothing', ['suits', 'shirts']) },
			{ label: 'Trousers & denim', href: collectionHref('clothing', ['trousers', 'denim']) },
			{
				label: 'Knitwear & outerwear',
				href: collectionHref('clothing', ['knitwear', 'jackets', 'coats'])
			},
			{
				label: 'Tracksuits & streetwear',
				href: collectionHref('clothing', ['tracksuits', 'streetwear'])
			}
		]
	},
	{
		label: 'Footwear',
		slug: 'footwear',
		links: [
			{ label: 'Trainers & sneakers', href: collectionHref('footwear', ['trainers', 'sneakers']) },
			{ label: 'Loafers', href: collectionHref('footwear', ['loafers']) },
			{ label: 'Brogues', href: collectionHref('footwear', ['brogues']) },
			{ label: 'Boots', href: collectionHref('footwear', ['boots']) }
		]
	},
	{
		label: 'Accessories',
		slug: 'accessories',
		links: [
			{ label: 'Bags', href: collectionHref('accessories', ['bags']) },
			{ label: 'Watches', href: collectionHref('accessories', ['watches']) },
			{ label: 'Belts', href: collectionHref('accessories', ['belts']) },
			{ label: 'Eyewear', href: collectionHref('accessories', ['eyewear']) }
		]
	}
] as const;

export const footwear = [
	{
		id: 'trainers',
		label: 'Trainers',
		title: 'A fresh perspective.',
		description:
			'Clean lines. A sculptural sole. An everyday silhouette with a different point of view.',
		images: [
			{
				key: 'trainers',
				label: 'Studio view',
				alt: 'White trainer balanced on its toe in a black studio'
			}
		]
	},
	{
		id: 'sneakers',
		label: 'Sneakers',
		title: 'Made for the city.',
		description:
			'A study in texture and proportion. Discover a contemporary take on the everyday sneaker.',
		images: [
			{
				key: 'sneakers',
				label: 'On-foot view',
				alt: 'Beige and black sneakers worn with dark trousers'
			},
			{
				key: 'sneakers-detail',
				label: 'Texture detail',
				alt: 'Close-up photograph of the texture and laces of a beige and black sneaker'
			}
		]
	},
	{
		id: 'brogues',
		label: 'Brogues',
		title: 'Character in every detail.',
		description:
			'Rich brown tones and intricate perforations bring a classic silhouette into the contemporary wardrobe.',
		images: [
			{
				key: 'brogues',
				label: 'Side view',
				alt: 'Brown brogue shoes showing decorative perforations on a display'
			},
			{
				key: 'brogues-detail',
				label: 'Detail view',
				alt: 'Closer angle of brown brogues arranged on a pedestal'
			}
		]
	},
	{
		id: 'loafers',
		label: 'Loafers',
		title: 'Ease, elevated.',
		description:
			'A warm cognac palette. An understated profile. The finishing touch to relaxed tailoring.',
		images: [
			{
				key: 'loafers',
				label: 'Studio view',
				alt: 'Brown penny loafers with contrasting pale soles'
			}
		]
	}
] as const;

export interface PreviewDestination {
	title: string;
	eyebrow: string;
	description: string;
	image: ImageKey;
	alt: string;
}
export const previews: Record<string, PreviewDestination> = {
	...Object.fromEntries(
		collections.map((c) => [
			c.id,
			{ title: c.label, eyebrow: 'The OLOYE edit', description: c.line, image: c.image, alt: c.alt }
		])
	),
	...Object.fromEntries(
		products.map((p) => [
			p.id,
			{
				title: p.name,
				eyebrow: `${p.category} · ${formatPrice(p.price)}`,
				description: 'A first look at the OLOYE wardrobe.',
				image: p.images[0].key,
				alt: p.images[0].alt
			}
		])
	),
	'new-arrivals': {
		title: 'A new perspective',
		eyebrow: 'New arrivals',
		description: 'Fresh silhouettes. Considered details. Your next chapter starts here.',
		image: 'tailoring',
		alt: 'Model in a contemporary ivory suit'
	},
	'art-of-presence': {
		title: 'The art of presence',
		eyebrow: 'The latest campaign',
		description: 'For the moments you step into. And the impression you leave behind.',
		image: 'presence',
		alt: 'Male model walking in a tan jacket, white trousers and black boots'
	},
	'after-hours': {
		title: 'After hours',
		eyebrow: 'The occasion edit',
		description: 'A little drama. A lot of presence. Discover a new language of evening dressing.',
		image: 'after-hours',
		alt: 'Female model in a black dress leaning across a studio plinth'
	},
	'ease-in-motion': {
		title: 'Ease in motion',
		eyebrow: 'OLOYE Journal · Style notes',
		description: 'Relaxed proportions, a confident palette and a wardrobe that moves with you.',
		image: 'menswear',
		alt: 'Male model wearing a patterned shirt and pale shorts'
	}
};
