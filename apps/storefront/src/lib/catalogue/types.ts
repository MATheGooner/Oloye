import type { ImageKey } from '#lib/content/photography.js';

export type Department = 'clothing' | 'footwear' | 'accessories';
export type Audience = 'men' | 'women';
export type CollectionSlug = Audience | Department | 'all' | 'new-arrivals' | 'sale';
export type CategorySlug =
	| 'suits'
	| 'shirts'
	| 'trousers'
	| 'denim'
	| 'knitwear'
	| 'jackets'
	| 'coats'
	| 'tracksuits'
	| 'streetwear'
	| 'dresses'
	| 'trainers'
	| 'sneakers'
	| 'brogues'
	| 'loafers'
	| 'boots'
	| 'bags'
	| 'watches'
	| 'belts'
	| 'eyewear';
export type ColorId =
	| 'ivory'
	| 'black'
	| 'stone'
	| 'sand'
	| 'brown'
	| 'navy'
	| 'blue'
	| 'red'
	| 'grey'
	| 'oxblood'
	| 'white'
	| 'silver'
	| 'gold';

export interface ProductColor {
	id: ColorId;
	name: string;
	value: string;
}

export interface ProductImage {
	key: ImageKey;
	alt: string;
	position?: string;
	fit?: 'cover' | 'contain';
}

export interface Product {
	id: string;
	name: string;
	brand: string;
	category: CategorySlug;
	collections: readonly CollectionSlug[];
	price: number;
	salePrice?: number;
	colors: readonly ProductColor[];
	sizes: readonly string[];
	images: readonly [ProductImage, ...ProductImage[]];
	description: string;
	isNew: boolean;
	addedAt: string;
}

export interface Collection {
	slug: CollectionSlug;
	label: string;
	title: string;
	statement: string;
	description: string;
	image: ProductImage;
	edition: string;
}

export type SortOrder = 'featured' | 'newest' | 'price-asc' | 'price-desc';
export type FilterKey = 'category' | 'size' | 'colour';

export interface DiscoveryState {
	query: string;
	sort: SortOrder;
	category: CategorySlug[];
	size: string[];
	colour: ColorId[];
	minPrice?: number;
	maxPrice?: number;
}

export interface FilterOption {
	value: string;
	label: string;
	count: number;
	swatch?: string;
}

export interface FilterOptions {
	category: FilterOption[];
	size: FilterOption[];
	colour: FilterOption[];
}
