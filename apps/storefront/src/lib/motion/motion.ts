type RevealOptions = { targets?: string; delay?: number; stagger?: number };
type RevealEntry = { group: object; options: RevealOptions };

const pending = new Map<HTMLElement, RevealEntry>();
const dialogAnimations = new WeakMap<HTMLDialogElement, Animation>();
let observer: IntersectionObserver | undefined;
let preference: MediaQueryList | undefined;

export function reducedMotion() {
	if (typeof window === 'undefined') return true;
	preference ??= window.matchMedia('(prefers-reduced-motion: reduce)');
	return preference.matches;
}

export const motionDuration = (duration: number) => (reducedMotion() ? 0 : duration);

function respectPreference(animation: Animation) {
	const change = () => {
		if (reducedMotion() && animation.playState !== 'finished') animation.finish();
	};
	const cleanup = () => preference?.removeEventListener('change', change);
	preference?.addEventListener('change', change);
	animation.finished.then(cleanup, cleanup);
	return animation;
}

function show(element: HTMLElement, delay = 0, immediately = false) {
	if (!pending.has(element)) return;
	pending.delete(element);
	observer?.unobserve(element);
	element.style.setProperty('--reveal-delay', `${delay}ms`);
	if (immediately) element.classList.add('motion-immediate');
	element.classList.remove('motion-pending');
	element.classList.add('motion-visible');
}

function revealObserver() {
	if (!observer) {
		observer = new IntersectionObserver(
			(entries) => {
				const groups = new Map<object, number>();
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					const element = entry.target as HTMLElement;
					const record = pending.get(element);
					if (!record) continue;
					const index = groups.get(record.group) ?? 0;
					groups.set(record.group, index + 1);
					show(
						element,
						(record.options.delay ?? 0) + Math.min(index, 3) * (record.options.stagger ?? 65)
					);
				}
			},
			{ threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
		);
		preference?.addEventListener('change', (event) => {
			if (event.matches) for (const element of pending.keys()) show(element, 0, true);
		});
	}
	return observer;
}

// Content stays visible in SSR, without JavaScript, and with reduced motion.
export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	if (reducedMotion() || !('IntersectionObserver' in window)) return {};
	const group = {};
	const elements = options.targets
		? [...node.querySelectorAll<HTMLElement>(options.targets)]
		: [node];
	const cleanups = elements.map((element) => {
		const focus = () => show(element, 0, true);
		pending.set(element, { group, options });
		element.classList.add('motion-reveal', 'motion-pending');
		element.addEventListener('focusin', focus);
		revealObserver().observe(element);
		return () => {
			pending.delete(element);
			observer?.unobserve(element);
			element.removeEventListener('focusin', focus);
			element.classList.remove(
				'motion-reveal',
				'motion-pending',
				'motion-visible',
				'motion-immediate'
			);
			element.style.removeProperty('--reveal-delay');
		};
	});
	return {
		update(next: RevealOptions) {
			for (const element of elements) {
				const record = pending.get(element);
				if (record) record.options = next;
			}
		},
		destroy() {
			cleanups.forEach((cleanup) => cleanup());
		}
	};
}

// A passive listener schedules one frame only while the desktop hero is visible.
export function parallax(node: HTMLElement) {
	if (!('IntersectionObserver' in window)) return {};
	const media = window.matchMedia(
		'(min-width: 1001px) and (prefers-reduced-motion: no-preference)'
	);
	let visible = false;
	let frame = 0;
	const update = () => {
		frame = 0;
		node.style.setProperty(
			'--campaign-offset',
			`${Math.min(18, Math.max(0, window.scrollY * 0.045))}px`
		);
	};
	const scroll = () => {
		if (!frame) frame = requestAnimationFrame(update);
	};
	const stop = () => {
		window.removeEventListener('scroll', scroll);
		cancelAnimationFrame(frame);
		frame = 0;
		node.classList.remove('parallax-active');
		node.style.removeProperty('--campaign-offset');
	};
	const sync = () => {
		stop();
		if (visible && media.matches) {
			node.classList.add('parallax-active');
			window.addEventListener('scroll', scroll, { passive: true });
			scroll();
		}
	};
	const visibility = new IntersectionObserver(([entry]) => {
		visible = entry?.isIntersecting ?? false;
		sync();
	});
	visibility.observe(node);
	media.addEventListener('change', sync);
	return {
		destroy() {
			stop();
			visibility.disconnect();
			media.removeEventListener('change', sync);
		}
	};
}

export function animateDialog(
	dialog: HTMLDialogElement,
	opening: boolean,
	side?: 'left' | 'right'
) {
	const previous = dialogAnimations.get(dialog);
	const current =
		previous?.playState === 'running'
			? { opacity: getComputedStyle(dialog).opacity, transform: getComputedStyle(dialog).transform }
			: undefined;
	previous?.cancel();
	if (side) dialog.dataset.motionSide = side;
	dialog.dataset.motionState = opening ? 'opening' : 'closing';
	const duration = motionDuration(opening ? 260 : 180);
	if (!duration || !dialog.animate) return;
	const away = {
		opacity: 0,
		transform: `translate3d(${dialog.dataset.motionSide === 'left' ? '-28px' : '28px'}, 0, 0)`
	};
	const rest = { opacity: 1, transform: 'translate3d(0, 0, 0)' };
	const animation = respectPreference(
		dialog.animate([current ?? (opening ? away : rest), opening ? rest : away], {
			duration,
			easing: opening ? 'cubic-bezier(0.22, 1, 0.36, 1)' : 'cubic-bezier(0.4, 0, 1, 1)',
			fill: opening ? 'none' : 'forwards'
		})
	);
	dialogAnimations.set(dialog, animation);
	return animation;
}

export function wishlistFeedback(button: HTMLButtonElement, added: boolean) {
	if (reducedMotion() || !button.animate) return;
	button.getAnimations().forEach((animation) => animation.cancel());
	respectPreference(
		button.animate(
			[
				{ transform: 'scale(1)' },
				{ transform: `scale(${added ? 1.12 : 0.94})` },
				{ transform: 'scale(1)' }
			],
			{ duration: 320, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
		)
	);
	const heart = button.querySelector('svg');
	heart?.getAnimations().forEach((animation) => animation.cancel());
	if (heart)
		respectPreference(
			heart.animate(
				[
					{ transform: 'scale(0.8) rotate(-12deg)' },
					{ transform: 'scale(1.18) rotate(6deg)', offset: 0.45 },
					{ transform: 'scale(1) rotate(0deg)' }
				],
				{ duration: 380, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
			)
		);
}
