import { getContext, setContext } from 'svelte';
import { productById } from '#lib/catalogue/products.js';

export type Overlay = 'search' | 'account' | 'wishlist' | 'bag' | 'menu' | null;
const key = Symbol('oloye-presentation');
const wishlistKey = 'oloye.wishlist.v1';

class Presentation {
	overlay = $state<Overlay>(null);
	wishlist = $state<string[]>([]);
	wishlistPersists = $state(false);
	announcement = $state('');

	syncWishlist(value: string | null) {
		try {
			const parsed: unknown = value === null ? [] : JSON.parse(value);
			this.wishlist = Array.isArray(parsed)
				? [
						...new Set(
							parsed.filter((id): id is string => typeof id === 'string' && productById.has(id))
						)
					]
				: [];
		} catch {
			this.wishlist = [];
		}
	}

	restoreWishlist() {
		try {
			this.syncWishlist(localStorage.getItem(wishlistKey));
			this.wishlistPersists = true;
		} catch {
			this.wishlistPersists = false;
		}
	}

	handleStorage(event: StorageEvent) {
		if (event.key === wishlistKey || event.key === null) this.restoreWishlist();
	}

	toggleWishlist(id: string, name: string) {
		const saved = this.wishlist.includes(id);
		this.wishlist = saved ? this.wishlist.filter((item) => item !== id) : [...this.wishlist, id];
		try {
			localStorage.setItem(wishlistKey, JSON.stringify(this.wishlist));
			this.wishlistPersists = true;
		} catch {
			this.wishlistPersists = false;
		}
		this.announcement = `${name} ${saved ? 'removed from' : 'added to'} your wishlist.`;
	}
}

// Created once per layout instance; no mutable state is shared across SSR requests.
export function createPresentation() {
	return setContext(key, new Presentation());
}
export function usePresentation() {
	return getContext<Presentation>(key);
}
