import type { CategorySlug, ColorId, Department, ProductColor } from './types.js';

export const categories: Record<
	CategorySlug,
	{ label: string; department: Department; terms: string }
> = {
	suits: {
		label: 'Suits',
		department: 'clothing',
		terms: 'suit tailoring tailored blazer formal occasion'
	},
	shirts: {
		label: 'Shirts',
		department: 'clothing',
		terms: 'shirt shirts tops overshirt separates'
	},
	trousers: {
		label: 'Trousers',
		department: 'clothing',
		terms: 'trouser trousers pants separates'
	},
	denim: { label: 'Denim', department: 'clothing', terms: 'denim jean jeans' },
	knitwear: {
		label: 'Knitwear',
		department: 'clothing',
		terms: 'knit sweater jumper rollneck turtleneck cardigan vest'
	},
	jackets: { label: 'Jackets', department: 'clothing', terms: 'jacket blouson blazer outerwear' },
	coats: { label: 'Coats', department: 'clothing', terms: 'coat trench overcoat outerwear' },
	tracksuits: {
		label: 'Tracksuits',
		department: 'clothing',
		terms: 'tracksuit track suit set sportswear athleisure'
	},
	streetwear: {
		label: 'Streetwear',
		department: 'clothing',
		terms: 'streetwear hoodie jersey t-shirt tshirt tee casual'
	},
	dresses: { label: 'Dresses', department: 'clothing', terms: 'dress dresses evening occasion' },
	trainers: { label: 'Trainers', department: 'footwear', terms: 'trainer trainers shoes footwear' },
	sneakers: { label: 'Sneakers', department: 'footwear', terms: 'sneaker sneakers shoes footwear' },
	brogues: {
		label: 'Brogues',
		department: 'footwear',
		terms: 'brogue brogues oxford oxfords shoes formal footwear'
	},
	loafers: {
		label: 'Loafers',
		department: 'footwear',
		terms: 'loafer loafers penny shoes footwear'
	},
	boots: {
		label: 'Boots',
		department: 'footwear',
		terms: 'boot boots chelsea ankle shoes footwear'
	},
	bags: {
		label: 'Bags',
		department: 'accessories',
		terms: 'bag bags tote handbag weekender accessories'
	},
	watches: {
		label: 'Watches',
		department: 'accessories',
		terms: 'watch watches wristwatch accessories'
	},
	belts: { label: 'Belts', department: 'accessories', terms: 'belt belts accessories' },
	eyewear: {
		label: 'Eyewear',
		department: 'accessories',
		terms: 'eyewear sunglasses glasses accessories'
	}
};

export const colors: Record<ColorId, ProductColor> = {
	ivory: { id: 'ivory', name: 'Ivory', value: '#dad4c7' },
	black: { id: 'black', name: 'Black', value: '#292a29' },
	stone: { id: 'stone', name: 'Stone', value: '#9d988b' },
	sand: { id: 'sand', name: 'Sand', value: '#bcb09f' },
	brown: { id: 'brown', name: 'Brown', value: '#805337' },
	navy: { id: 'navy', name: 'Navy', value: '#293548' },
	blue: { id: 'blue', name: 'Blue', value: '#6789ae' },
	red: { id: 'red', name: 'Red', value: '#b93c3e' },
	grey: { id: 'grey', name: 'Grey', value: '#8c8b88' },
	oxblood: { id: 'oxblood', name: 'Oxblood', value: '#572b32' },
	white: { id: 'white', name: 'White', value: '#f1f0eb' },
	silver: { id: 'silver', name: 'Silver', value: '#bfc1c1' },
	gold: { id: 'gold', name: 'Gold', value: '#a68b5b' }
};

export const sortOptions = [
	{ value: 'featured', label: 'Featured' },
	{ value: 'newest', label: 'Newest' },
	{ value: 'price-asc', label: 'Price: low to high' },
	{ value: 'price-desc', label: 'Price: high to low' }
] as const;

export const formatPrice = (price: number) =>
	new Intl.NumberFormat('en-IE', {
		style: 'currency',
		currency: 'EUR',
		maximumFractionDigits: 0
	}).format(price);

export const sellingPrice = (product: { price: number; salePrice?: number }) =>
	product.salePrice ?? product.price;
