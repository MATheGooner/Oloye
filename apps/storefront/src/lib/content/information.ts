export interface InformationPage {
	title: string;
	intro: string;
	sections: { heading: string; text: string }[];
}
export const information: Record<string, InformationPage> = {
	about: {
		title: 'A name. A point of view.',
		intro: 'OLOYE is a contemporary fashion concept developed by Bitmason Labs.',
		sections: [
			{
				heading: 'Distinction, by instinct',
				text: 'The name is inspired by the Yoruba title Olóyè, associated with honour, distinction and prestige. That spirit informs a global, contemporary wardrobe — confident tailoring, elevated essentials and considered finishing touches.'
			},
			{
				heading: 'The OLOYE wardrobe',
				text: 'Menswear leads our point of view, alongside a curated womenswear, footwear and accessories edit. The collection shown here is an editorial first look, with illustrative names and prices.'
			}
		]
	},
	support: {
		title: 'Client services',
		intro: 'A considered experience, from the first look to the last detail.',
		sections: [
			{
				heading: 'Before launch',
				text: 'OLOYE is currently a Bitmason Labs portfolio concept. Orders, customer accounts and live customer support are not available yet.'
			},
			{
				heading: 'Find your answer',
				text: 'Explore our shipping and returns, size guide and contact information using the links below. Service details will be published before shopping opens.'
			}
		]
	},
	'shipping-returns': {
		title: 'Shipping & returns',
		intro: 'A global point of view. Service details will follow.',
		sections: [
			{
				heading: 'Delivery',
				text: 'Delivery destinations, carrier options, charges and estimated delivery windows will be confirmed before launch. No shipping offer is currently active.'
			},
			{
				heading: 'Returns',
				text: 'The returns window, eligibility, process and any charges will be published before orders open. This preview does not accept purchases.'
			}
		]
	},
	'size-guide': {
		title: 'Find your fit',
		intro: 'Good style starts with a comfortable fit.',
		sections: [
			{
				heading: 'Take your measurements',
				text: 'Use a soft measuring tape. Measure around the fullest part of your chest or bust, your natural waist and the fullest part of your hips. Keep the tape level and comfortably close to the body.'
			},
			{
				heading: 'A guide for each piece',
				text: 'Brand-specific size charts, garment measurements and footwear sizing will accompany the live collection. Do not use these sample photographs to infer the fit or sizing of a future product.'
			}
		]
	},
	contact: {
		title: 'Let’s connect',
		intro: 'OLOYE is a fashion portfolio project by Bitmason Labs.',
		sections: [
			{
				heading: 'Contact at launch',
				text: 'Verified customer-service contact details will be published when the store launches. There is currently no OLOYE support inbox or order service.'
			},
			{
				heading: 'Stay curious',
				text: 'Explore the journal and the collection preview to discover the OLOYE point of view.'
			}
		]
	},
	privacy: {
		title: 'Your privacy',
		intro: 'This preview keeps things simple.',
		sections: [
			{
				heading: 'Presentation state',
				text: 'Wishlist selections are saved in local storage on this device and can be removed using the wishlist controls or by clearing browser site data. If storage is unavailable, selections last for the current visit. Search and filters appear in the page address so results can be shared. Selections are not linked to an account or sent to a commerce service.'
			},
			{
				heading: 'Newsletter preview',
				text: 'The newsletter form validates an email address in your browser and displays feedback. It does not submit, save or subscribe the address. No analytics or marketing trackers are installed by this homepage.'
			},
			{
				heading: 'Before shopping opens',
				text: 'A complete privacy policy, covering the live store’s data handling and service providers, will be published before launch.'
			}
		]
	},
	terms: {
		title: 'Terms of this preview',
		intro: 'An editorial first look at OLOYE.',
		sections: [
			{
				heading: 'Portfolio concept',
				text: 'This website demonstrates the OLOYE visual identity. Styles, names, colour options and prices are illustrative. Products cannot be purchased through this preview.'
			},
			{
				heading: 'Photography',
				text: 'Photographs are licensed editorial references and do not establish product specifications, brand partnerships or model endorsements. Future product listings will use verified photography and specifications.'
			},
			{
				heading: 'Future store',
				text: 'Full terms of sale and service will be published before commerce functionality becomes available.'
			}
		]
	},
	social: {
		title: 'The conversation continues',
		intro: 'A new perspective, coming to your feed.',
		sections: [
			{
				heading: 'Instagram & Pinterest',
				text: 'OLOYE’s verified social profiles will be linked here at launch. No official brand handles are claimed by this portfolio preview.'
			}
		]
	},
	photography: {
		title: 'Behind the imagery',
		intro: 'Real photography. A considered point of view.',
		sections: [
			{
				heading: 'Creative credits',
				text: 'Homepage and catalogue imagery is sourced from Pexels and served locally in optimised WebP format. Individual photographer credits and original source links appear below.'
			},
			{
				heading: 'Use and licensing',
				text: 'The Pexels licence allows website and commercial use and image modification. Images are used here as fashion references; no model or pictured brand endorsement is implied. See PHOTOGRAPHY.md in the project for licensing and launch considerations.'
			}
		]
	}
};
