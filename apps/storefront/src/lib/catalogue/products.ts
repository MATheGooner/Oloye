import { categories, colors } from './categories.js';
import type { Audience, ColorId, Product, ProductColor } from './types.js';

type ProductInput = Omit<
	Product,
	'brand' | 'collections' | 'colors' | 'sizes' | 'isNew' | 'addedAt'
> & {
	audience: Audience[];
	brand?: string;
	colors: (ColorId | ProductColor)[];
	sizes?: string[];
	isNew?: boolean;
	addedAt?: string;
};

const clothingSizes = ['XS', 'S', 'M', 'L', 'XL'];
const shoeSizes = [
	'EU 36',
	'EU 37',
	'EU 38',
	'EU 39',
	'EU 40',
	'EU 41',
	'EU 42',
	'EU 43',
	'EU 44',
	'EU 45',
	'EU 46'
];

function product(input: ProductInput): Product {
	const { audience, ...piece } = input;
	const department = categories[piece.category].department;
	return {
		...piece,
		brand:
			piece.brand ??
			(department === 'accessories'
				? 'OLOYE Objects'
				: department === 'footwear'
					? 'OLOYE Editions'
					: ['suits', 'dresses', 'coats'].includes(piece.category)
						? 'OLOYE Atelier'
						: 'OLOYE Studio'),
		collections: [...audience, department],
		colors: piece.colors.map((color) => (typeof color === 'string' ? colors[color] : color)),
		sizes:
			piece.sizes ??
			(department === 'footwear'
				? shoeSizes.filter(
						(_, index) => audience.length === 2 || (audience[0] === 'men' ? index >= 3 : index <= 5)
					)
				: department === 'accessories'
					? ['One size']
					: clothingSizes),
		isNew: piece.isNew ?? false,
		addedAt: piece.addedAt ?? '2026-10-12'
	};
}

// An independent, illustrative frontend catalogue. No stock, checkout or Medusa records.
// Every photograph is local; provenance and licensing are recorded in photography.json.
export const products: readonly Product[] = [
	product({
		id: 'ivory-tailoring',
		name: 'The Ivory Suit',
		category: 'suits',
		audience: ['men'],
		price: 385,
		colors: ['ivory', { ...colors.black, name: 'Obsidian' }],
		sizes: ['S', 'M', 'L', 'XL'],
		isNew: true,
		addedAt: '2026-11-22',
		images: [
			{ key: 'tailoring', alt: 'Model wearing a contemporary ivory suit with a black shoulder bag' }
		],
		description:
			'An easy silhouette with a confident line. Relaxed tailoring for the occasions you make your own.'
	}),
	product({
		id: 'studio-overshirt',
		name: 'The Studio Overshirt',
		category: 'shirts',
		audience: ['women'],
		price: 145,
		colors: [{ ...colors.ivory, name: 'Chalk', value: '#e3ded4' }, 'stone'],
		isNew: true,
		addedAt: '2026-11-23',
		images: [{ key: 'womenswear', alt: 'Model in an ivory overshirt and matching shorts' }],
		description:
			'Clean lines, generous proportions. A versatile layer for a quietly distinctive everyday wardrobe.'
	}),
	product({
		id: 'relaxed-jersey',
		name: 'The Relaxed Jersey',
		category: 'streetwear',
		audience: ['men', 'women'],
		price: 95,
		colors: ['sand', 'oxblood', { ...colors.black, name: 'Obsidian' }],
		isNew: true,
		addedAt: '2026-11-21',
		images: [
			{ key: 'jersey', alt: 'Model wearing a relaxed beige T-shirt and coordinated shorts' }
		],
		description: 'An effortless shape in a considered palette. The everyday piece you come back to.'
	}),
	product({
		id: 'city-loafer',
		name: 'The City Loafer',
		category: 'loafers',
		audience: ['men', 'women'],
		price: 225,
		colors: [{ ...colors.brown, name: 'Cognac' }, 'black'],
		isNew: true,
		addedAt: '2026-11-20',
		images: [
			{
				key: 'loafers',
				alt: 'Brown penny loafers with pale soles photographed on a dark background'
			}
		],
		description:
			'A classic penny silhouette, an unexpected sole. An understated finishing touch to relaxed tailoring.'
	}),
	product({
		id: 'charcoal-suit',
		name: 'The Charcoal Suit',
		category: 'suits',
		audience: ['men'],
		price: 425,
		colors: ['grey', 'black'],
		sizes: ['M', 'L', 'XL'],
		isNew: true,
		addedAt: '2026-11-23',
		images: [
			{
				key: 'grey-suit',
				alt: 'Black male model reclining in a charcoal suit with a white T-shirt',
				position: 'center 35%'
			}
		],
		description:
			'A softer approach to sharp dressing. A charcoal two-piece with room for a little individuality.'
	}),
	product({
		id: 'presence-jacket',
		name: 'The Presence Jacket',
		category: 'jackets',
		audience: ['men'],
		price: 245,
		colors: ['sand', 'black'],
		isNew: true,
		addedAt: '2026-11-19',
		images: [
			{
				key: 'presence',
				alt: 'Black male model wearing a tan jacket with white trousers',
				position: 'center 40%'
			}
		],
		description:
			'Confident proportions and a warm neutral tone. A distinctive layer for wherever the day takes you.'
	}),
	product({
		id: 'print-camp-shirt',
		name: 'The Print Camp Shirt',
		category: 'shirts',
		audience: ['men'],
		price: 125,
		colors: ['stone', 'navy'],
		sizes: ['S', 'M', 'L', 'XL'],
		images: [
			{ key: 'menswear', alt: 'Black male model in a patterned open-collar shirt and pale shorts' }
		],
		description:
			'An open collar, an expressive print. Wear it loose and let the details do the talking.'
	}),
	product({
		id: 'blue-rollneck',
		name: 'The Blue Rollneck',
		category: 'knitwear',
		audience: ['men', 'women'],
		price: 165,
		colors: ['blue', 'ivory', 'black'],
		isNew: true,
		addedAt: '2026-11-18',
		images: [
			{ key: 'blue-knit', alt: 'Black male model with locs wearing a blue rollneck sweater' }
		],
		description:
			'A striking blue tone and a clean, high neckline. A fresh point of view on a wardrobe favourite.'
	}),
	product({
		id: 'graphic-knit',
		name: 'The Graphic Knit',
		category: 'knitwear',
		audience: ['men', 'women'],
		price: 195,
		salePrice: 135,
		colors: ['red', 'black'],
		sizes: ['S', 'M', 'L'],
		images: [
			{
				key: 'graphic-knit',
				alt: 'Black male model wearing a red sweater with an expressive white graphic'
			}
		],
		description: 'Bold red. Expressive texture. A statement layer for a wardrobe with personality.'
	}),
	product({
		id: 'cable-vest',
		name: 'The Textured Vest',
		category: 'knitwear',
		audience: ['men'],
		price: 135,
		colors: ['brown', 'stone'],
		sizes: ['S', 'M', 'L', 'XL'],
		images: [
			{
				key: 'textured-vest',
				alt: 'Black male model with an afro wearing a brown knitted vest over a shirt'
			}
		],
		description:
			'A rich earth tone, a textured finish. A thoughtful extra layer over your favourite shirt.'
	}),
	product({
		id: 'leather-blouson',
		name: 'The Leather Blouson',
		category: 'jackets',
		audience: ['men'],
		price: 355,
		salePrice: 265,
		colors: ['black', 'brown'],
		sizes: ['S', 'M', 'L', 'XL'],
		images: [
			{ key: 'leather-jacket', alt: 'Black male model in a black leather jacket and blue jeans' }
		],
		description:
			'A confident profile with an everyday attitude. Bring a little edge to a simple silhouette.'
	}),
	product({
		id: 'sand-trench',
		name: 'The Sand Trench',
		category: 'coats',
		audience: ['men', 'women'],
		price: 365,
		colors: ['sand', 'black'],
		sizes: ['S', 'M', 'L', 'XL'],
		images: [
			{ key: 'sand-trench', alt: 'Male model in a long sand-coloured coat over a black top' }
		],
		description:
			'Long lines, a light earth tone. A timeless outer layer with an easy, contemporary feel.'
	}),
	product({
		id: 'studio-hoodie',
		name: 'The Studio Hoodie',
		category: 'streetwear',
		audience: ['men', 'women'],
		price: 115,
		salePrice: 79,
		colors: ['grey', 'black', 'ivory'],
		images: [
			{
				key: 'studio-hoodie',
				alt: 'Black male model with locs wearing a grey hoodie against a wooden studio wall',
				position: 'center 38%'
			}
		],
		description: 'Relaxed, understated and ready for the everyday. An essential with space to move.'
	}),
	product({
		id: 'ivory-track-set',
		name: 'The Ivory Track Set',
		category: 'tracksuits',
		audience: ['men', 'women'],
		price: 185,
		colors: ['ivory', 'grey', 'black'],
		sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
		images: [
			{
				key: 'ivory-tracksuit',
				alt: 'Male model in a white hoodie and coordinating relaxed trousers'
			}
		],
		description: 'Coordinated ease from head to toe. A fresh neutral set for days in motion.'
	}),
	product({
		id: 'noir-cargo-denim',
		name: 'The Noir Cargo Jean',
		category: 'denim',
		audience: ['men'],
		price: 155,
		colors: ['black', 'navy'],
		sizes: ['W 28', 'W 30', 'W 32', 'W 34', 'W 36'],
		images: [
			{ key: 'noir-denim', alt: 'Black male model wearing black cargo jeans and a dark vest' }
		],
		description:
			'An expressive silhouette with utility details. A different rhythm for your daily denim.'
	}),
	product({
		id: 'indigo-overall',
		name: 'The Indigo Overall',
		category: 'denim',
		audience: ['men'],
		price: 145,
		salePrice: 105,
		colors: ['navy', 'blue'],
		sizes: ['W 28', 'W 30', 'W 32', 'W 34'],
		images: [
			{
				key: 'indigo-denim',
				alt: 'Black male model wearing blue denim overalls and a cap in a studio'
			}
		],
		description:
			'A familiar workwear shape with an expressive attitude. Everyday denim with a distinctive point of view.'
	}),
	product({
		id: 'pleated-trousers',
		name: 'The Pleated Trouser',
		category: 'trousers',
		audience: ['men'],
		price: 175,
		colors: ['sand', 'black', 'stone'],
		sizes: ['S', 'M', 'L', 'XL'],
		images: [
			{ key: 'pleated-trousers', alt: 'Male model in beige tailored trousers with a green sweater' }
		],
		description:
			'A generous line and a considered neutral palette. An easy foundation for modern dressing.'
	}),
	product({
		id: 'denim-overshirt',
		name: 'The Denim Overshirt',
		category: 'shirts',
		audience: ['men', 'women'],
		price: 155,
		colors: ['blue', 'navy'],
		sizes: ['S', 'M', 'L', 'XL'],
		images: [
			{ key: 'denim-shirt', alt: 'Male model wearing a blue denim shirt with coordinating jeans' }
		],
		description:
			'An uncomplicated layer with a familiar texture. Wear it buttoned up or open over a simple tee.'
	}),
	product({
		id: 'after-hours-dress',
		name: 'The After Hours Dress',
		category: 'dresses',
		audience: ['women'],
		price: 265,
		colors: ['black', 'oxblood'],
		sizes: ['XS', 'S', 'M', 'L'],
		isNew: true,
		addedAt: '2026-11-22',
		images: [
			{
				key: 'after-hours',
				alt: 'Black female model in a black evening dress leaning on a studio plinth',
				position: '60% center'
			}
		],
		description:
			'A little drama. A lasting impression. An expressive black silhouette for the evenings that are yours.'
	}),
	product({
		id: 'sienna-dress',
		name: 'The Sienna Mini Dress',
		category: 'dresses',
		audience: ['women'],
		price: 215,
		salePrice: 155,
		colors: ['brown', 'black'],
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		images: [
			{
				key: 'wrap-dress',
				alt: 'Black female model in a sienna long-sleeved mini dress against a light studio backdrop'
			}
		],
		description:
			'Warm colour and an expressive line. A considered choice for day-to-evening dressing.'
	}),
	product({
		id: 'sculpted-blazer',
		name: 'The Sculpted Blazer',
		category: 'jackets',
		audience: ['women'],
		price: 285,
		colors: ['black', 'ivory'],
		sizes: ['S', 'M', 'L', 'XL'],
		isNew: true,
		addedAt: '2026-11-21',
		images: [
			{
				key: 'sculpted-blazer',
				alt: 'Black female model in a fitted black blazer with expressive flared sleeves'
			}
		],
		description:
			'A defined waist, a statement sleeve. Contemporary tailoring with a sculptural point of view.'
	}),
	product({
		id: 'city-coat',
		name: 'The City Coat',
		category: 'coats',
		audience: ['women'],
		price: 325,
		salePrice: 235,
		colors: ['brown', 'black'],
		sizes: ['XS', 'S', 'M', 'L'],
		images: [
			{
				key: 'city-coat',
				alt: 'Black female model with short hair in a brown coat against a red studio backdrop'
			}
		],
		description:
			'A warm earth tone with a confident city attitude. An outer layer that makes an impression.'
	}),
	product({
		id: 'wide-leg-trousers',
		name: 'The Fluid Trouser',
		category: 'trousers',
		audience: ['women'],
		price: 165,
		colors: ['black', 'stone'],
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		images: [
			{
				key: 'fluid-trousers',
				alt: 'Black female model with braids wearing fluid black trousers and a black sleeveless top'
			}
		],
		description:
			'An easy, flowing line in a versatile dark tone. Pair with a clean shirt or a sculptural jacket.'
	}),
	product({
		id: 'black-slim-jeans',
		name: 'The Noir Slim Jean',
		category: 'denim',
		audience: ['women'],
		price: 135,
		salePrice: 95,
		colors: ['black', 'blue'],
		sizes: ['W 26', 'W 28', 'W 30', 'W 32'],
		images: [
			{
				key: 'noir-jeans',
				alt: 'Black female model in slim black jeans and a black top against a textured studio wall'
			}
		],
		description:
			'A clean silhouette in a deep, versatile wash. The denim you reach for without a second thought.'
	}),
	product({
		id: 'denim-coord',
		name: 'The Downtown Denim Set',
		category: 'denim',
		audience: ['women'],
		price: 245,
		colors: ['blue', 'navy'],
		sizes: ['XS', 'S', 'M', 'L'],
		isNew: true,
		addedAt: '2026-11-20',
		images: [
			{
				key: 'downtown-denim',
				alt: 'Black female model wearing a blue denim vest and jeans on a city street'
			}
		],
		description:
			'Head-to-toe denim with an individual spirit. Bring your own attitude to a familiar texture.'
	}),
	product({
		id: 'white-rollneck',
		name: 'The Essential Rollneck',
		category: 'knitwear',
		audience: ['women'],
		price: 125,
		colors: ['white', 'black', 'sand'],
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		images: [
			{
				key: 'essential-knit',
				alt: 'Black female model in a white rollneck with black trousers and a handbag'
			}
		],
		description:
			'A clean high neckline and an easy silhouette. A simple layer with a lasting place in your wardrobe.'
	}),
	product({
		id: 'form-trainer',
		name: 'The Form Trainer',
		category: 'trainers',
		audience: ['men', 'women'],
		price: 195,
		colors: ['white', 'black'],
		isNew: true,
		addedAt: '2026-11-19',
		images: [
			{
				key: 'trainers',
				alt: 'Sculptural white trainer balanced on its toe against a dark background'
			}
		],
		description:
			'A sculptural sole and a fresh white profile. An everyday trainer with a different point of view.'
	}),
	product({
		id: 'cloud-trainer',
		name: 'The Cloud Trainer',
		category: 'trainers',
		audience: ['men', 'women'],
		price: 175,
		colors: ['white', 'stone'],
		images: [
			{
				key: 'cloud-trainer',
				alt: 'White lace-up trainers suspended against a pale blue studio backdrop',
				fit: 'contain'
			}
		],
		description:
			'An understated white silhouette for days on the move. Easy to style, wherever you are headed.'
	}),
	product({
		id: 'city-sneaker',
		name: 'The City Sneaker',
		category: 'sneakers',
		audience: ['men', 'women'],
		price: 185,
		colors: ['sand', 'black'],
		images: [
			{ key: 'sneakers', alt: 'Beige and black sneakers worn with dark trousers' },
			{
				key: 'sneakers-detail',
				alt: 'Close-up of the same beige sneaker showing its laces and textured panels'
			}
		],
		description:
			'A study in texture and proportion. A contemporary sneaker for a wardrobe in motion.'
	}),
	product({
		id: 'canvas-sneaker',
		name: 'The Canvas High Top',
		category: 'sneakers',
		audience: ['men', 'women'],
		price: 115,
		salePrice: 85,
		colors: ['ivory', 'black'],
		images: [
			{
				key: 'canvas-sneaker',
				alt: 'Pair of light ivory canvas high-top sneakers on a sunlit table'
			}
		],
		description:
			'A familiar high-top profile in a warm light tone. An uncomplicated companion to your everyday denim.'
	}),
	product({
		id: 'heritage-brogue',
		name: 'The Heritage Brogue',
		category: 'brogues',
		audience: ['men'],
		price: 245,
		colors: ['brown', 'black'],
		images: [
			{ key: 'brogues', alt: 'Brown brogue shoes showing decorative perforations on a display' },
			{
				key: 'brogues-detail',
				alt: 'Another angle of the same brown brogues arranged on a pedestal'
			}
		],
		description:
			'Character in every detail. A warm brown tone and a classic perforated silhouette for modern tailoring.'
	}),
	product({
		id: 'chelsea-boot',
		name: 'The Chelsea Boot',
		category: 'boots',
		audience: ['men', 'women'],
		price: 275,
		colors: ['black', 'brown'],
		images: [{ key: 'chelsea-boots', alt: 'Pair of black Chelsea boots on a dark rustic shelf' }],
		description: 'A clean line and an assured profile. A distinctive foundation for city dressing.'
	}),
	product({
		id: 'ankle-boot',
		name: 'The Sculpted Ankle Boot',
		category: 'boots',
		audience: ['women'],
		price: 255,
		salePrice: 185,
		colors: ['black', 'stone'],
		sizes: ['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41'],
		images: [
			{
				key: 'ankle-boots',
				alt: 'Black heeled ankle boots photographed against a minimal studio backdrop',
				fit: 'contain'
			}
		],
		description:
			'A strong shape, a little elevation. A finishing touch for tailored trousers and evening silhouettes.'
	}),
	product({
		id: 'weekender',
		name: 'The Cognac Weekender',
		category: 'bags',
		audience: ['men', 'women'],
		price: 345,
		colors: [{ ...colors.brown, name: 'Cognac' }, 'black'],
		images: [
			{
				key: 'accessories',
				alt: 'Black male model beside a structured cognac weekender bag',
				position: 'center 65%'
			}
		],
		description: 'A rich tone and a generous shape. A considered companion for a change of scene.'
	}),
	product({
		id: 'studio-tote',
		name: 'The Studio Tote',
		category: 'bags',
		audience: ['women'],
		price: 195,
		colors: ['stone', 'black'],
		isNew: true,
		addedAt: '2026-11-18',
		images: [
			{ key: 'studio-tote', alt: 'Stone-coloured structured handbag with contrasting dark handles' }
		],
		description: 'Clean geometry with contrasting details. A versatile bag for your everyday world.'
	}),
	product({
		id: 'classic-watch',
		name: 'The Classic Timepiece',
		category: 'watches',
		audience: ['men', 'women'],
		price: 295,
		colors: ['brown', 'black'],
		images: [
			{
				key: 'classic-watch',
				alt: 'Classic analog wristwatch with a dark leather strap in a studio close-up',
				fit: 'contain'
			}
		],
		description:
			'An elegant dial, an understated strap. A timeless detail for the moments that matter.'
	}),
	product({
		id: 'textured-belt',
		name: 'The Textured Belt',
		category: 'belts',
		audience: ['men', 'women'],
		price: 85,
		salePrice: 65,
		colors: ['brown', 'black'],
		sizes: ['80 cm', '85 cm', '90 cm', '95 cm', '100 cm'],
		images: [{ key: 'textured-belt', alt: 'Close-up of a brown textured belt with metal details' }],
		description:
			'A rich brown texture and a considered finish. The small detail that brings a look together.'
	}),
	product({
		id: 'perspective-eyewear',
		name: 'The Perspective Frame',
		category: 'eyewear',
		audience: ['men', 'women'],
		price: 155,
		colors: ['silver', 'gold'],
		images: [
			{
				key: 'perspective-eyewear',
				alt: 'Black male model wearing silver aviator-style sunglasses and a grey tailored jacket'
			}
		],
		description:
			'A fresh frame of reference. Expressive eyewear for a distinctive personal perspective.'
	})
];

export const productById = new Map(products.map((piece) => [piece.id, piece]));
export const homepageProducts = [
	'ivory-tailoring',
	'studio-overshirt',
	'relaxed-jersey',
	'city-loafer'
].map((id) => productById.get(id)!);
