export function trapDialogFocus(dialog: HTMLDialogElement, event: KeyboardEvent) {
	if (event.key !== 'Tab') return;
	const controls = [
		...dialog.querySelectorAll<HTMLElement>(
			'a[href], button:not([disabled]), input:not([disabled]), select, summary, [tabindex="0"]'
		)
	].filter((element) => element.getClientRects().length > 0);
	const first = controls[0],
		last = controls.at(-1);
	if (event.shiftKey && document.activeElement === first) {
		event.preventDefault();
		last?.focus();
	} else if (!event.shiftKey && document.activeElement === last) {
		event.preventDefault();
		first?.focus();
	}
}

export function clickedBackdrop(dialog: HTMLDialogElement, event: MouseEvent) {
	if (event.target !== dialog) return false;
	const rect = dialog.getBoundingClientRect();
	return (
		event.clientX < rect.left ||
		event.clientX > rect.right ||
		event.clientY < rect.top ||
		event.clientY > rect.bottom
	);
}
