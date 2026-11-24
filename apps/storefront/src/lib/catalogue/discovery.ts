import { categories, colors, sellingPrice, sortOptions } from './categories.js';
import { products } from './products.js';
import type {
	CategorySlug,
	CollectionSlug,
	ColorId,
	DiscoveryState,
	FilterKey,
	FilterOptions,
	Product,
	SortOrder
} from './types.js';

const availableSizes = new Set(products.flatMap((product) => [...product.sizes]));
const unique = <T>(values: T[]) => [...new Set(values)];

const priceFromQuery = (value: string | null) => {
	if (value === null || value.trim() === '') return undefined;
	const price = Number(value);
	return Number.isFinite(price) && price >= 0 && price <= 100000 ? price : undefined;
};

export function readDiscoveryState(
	params: Pick<URLSearchParams, 'get' | 'getAll'>
): DiscoveryState {
	const min = priceFromQuery(params.get('min'));
	const max = priceFromQuery(params.get('max'));
	return {
		query: (params.get('q') ?? '').trim().slice(0, 120),
		sort: sortOptions.some((option) => option.value === params.get('sort'))
			? (params.get('sort') as SortOrder)
			: 'featured',
		category: unique(
			params
				.getAll('category')
				.filter((value): value is CategorySlug => Object.hasOwn(categories, value))
		),
		size: unique(params.getAll('size').filter((value) => availableSizes.has(value))),
		colour: unique(
			params.getAll('colour').filter((value): value is ColorId => Object.hasOwn(colors, value))
		),
		minPrice: min !== undefined && max !== undefined ? Math.min(min, max) : min,
		maxPrice: min !== undefined && max !== undefined ? Math.max(min, max) : max
	};
}

export function writeDiscoveryState(params: URLSearchParams, state: DiscoveryState) {
	for (const key of ['q', 'sort', 'category', 'size', 'colour', 'min', 'max']) params.delete(key);
	if (state.query) params.set('q', state.query);
	if (state.sort !== 'featured') params.set('sort', state.sort);
	for (const key of ['category', 'size', 'colour'] as const) {
		for (const value of state[key]) params.append(key, value);
	}
	if (state.minPrice !== undefined) params.set('min', String(state.minPrice));
	if (state.maxPrice !== undefined) params.set('max', String(state.maxPrice));
	return params;
}

export function copyDiscoveryState(state: DiscoveryState): DiscoveryState {
	return {
		...state,
		category: [...state.category],
		size: [...state.size],
		colour: [...state.colour]
	};
}

export function toggleFilter(state: DiscoveryState, key: FilterKey, value: string): DiscoveryState {
	const values = state[key] as string[];
	return {
		...state,
		[key]: values.includes(value) ? values.filter((item) => item !== value) : [...values, value]
	};
}

export function clearFilters(state: DiscoveryState): DiscoveryState {
	return { ...state, category: [], size: [], colour: [], minPrice: undefined, maxPrice: undefined };
}

export const filterCount = (state: DiscoveryState) =>
	state.category.length +
	state.size.length +
	state.colour.length +
	Number(state.minPrice !== undefined || state.maxPrice !== undefined);

export function collectionProducts(slug: CollectionSlug): readonly Product[] {
	if (slug === 'all') return products;
	if (slug === 'new-arrivals') return products.filter((product) => product.isNew);
	if (slug === 'sale') return products.filter((product) => product.salePrice !== undefined);
	return products.filter((product) => product.collections.includes(slug));
}

const normalize = (text: string) =>
	text
		.normalize('NFKD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase();

export function searchProducts(source: readonly Product[], query: string): readonly Product[] {
	const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
	if (!terms.length) return source;
	return source.filter((product) => {
		const searchable = normalize(
			`${product.name} ${product.brand} ${categories[product.category].label} ${categories[product.category].terms}`
		);
		return terms.every((term) => searchable.includes(term));
	});
}

export function filterProducts(source: readonly Product[], state: DiscoveryState): Product[] {
	return source.filter(
		(product) =>
			(!state.category.length || state.category.includes(product.category)) &&
			(!state.size.length || state.size.some((size) => product.sizes.includes(size))) &&
			(!state.colour.length || product.colors.some((color) => state.colour.includes(color.id))) &&
			(state.minPrice === undefined || sellingPrice(product) >= state.minPrice) &&
			(state.maxPrice === undefined || sellingPrice(product) <= state.maxPrice)
	);
}

export function sortProducts(source: readonly Product[], order: SortOrder): Product[] {
	return [...source].sort((a, b) =>
		order === 'newest'
			? b.addedAt.localeCompare(a.addedAt)
			: order === 'price-asc'
				? sellingPrice(a) - sellingPrice(b)
				: order === 'price-desc'
					? sellingPrice(b) - sellingPrice(a)
					: 0
	);
}

export function filterOptions(source: readonly Product[]): FilterOptions {
	const count = (matches: (product: Product) => boolean) => source.filter(matches).length;
	const sizes = unique(source.flatMap((product) => [...product.sizes]));
	const letterSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
	sizes.sort((a, b) => {
		const first = letterSizes.indexOf(a),
			second = letterSizes.indexOf(b);
		if (first >= 0 || second >= 0) return (first < 0 ? 99 : first) - (second < 0 ? 99 : second);
		return a.localeCompare(b, 'en', { numeric: true });
	});
	return {
		category: (Object.keys(categories) as CategorySlug[])
			.map((value) => ({
				value,
				label: categories[value].label,
				count: count((product) => product.category === value)
			}))
			.filter((option) => option.count),
		size: sizes.map((value) => ({
			value,
			label: value,
			count: count((product) => product.sizes.includes(value))
		})),
		colour: (Object.keys(colors) as ColorId[])
			.map((value) => ({
				value,
				label: colors[value].name,
				swatch: colors[value].value,
				count: count((product) => product.colors.some((color) => color.id === value))
			}))
			.filter((option) => option.count)
	};
}
