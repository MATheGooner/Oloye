<script lang="ts">
	import Icon from '#lib/components/ui/Icon.svelte';
	let email = $state('');
	let feedback = $state('');
	let invalid = $state(false);
	const groups = [
		{
			title: 'Client services',
			links: [
				{ label: 'Customer support', slug: 'support' },
				{ label: 'Shipping & returns', slug: 'shipping-returns' },
				{ label: 'Size guide', slug: 'size-guide' },
				{ label: 'Contact', slug: 'contact' }
			]
		},
		{
			title: 'The world of OLOYE',
			links: [
				{ label: 'About OLOYE', slug: 'about' },
				{ label: 'The journal', href: '/preview/ease-in-motion' },
				{ label: 'Instagram', slug: 'social' },
				{ label: 'Pinterest', slug: 'social' }
			]
		},
		{
			title: 'The details',
			links: [
				{ label: 'Privacy', slug: 'privacy' },
				{ label: 'Terms of use', slug: 'terms' },
				{ label: 'Photography credits', slug: 'photography' }
			]
		}
	];
	function subscribe(event: SubmitEvent) {
		event.preventDefault();
		invalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
		feedback = invalid
			? 'Please enter a valid email address.'
			: 'Thank you for your interest. Newsletter sign-ups open at launch; your email has not been saved.';
		if (!invalid) email = '';
	}
</script>

<footer class="footer">
	<div class="shell">
		<div class="newsletter">
			<div>
				<p class="eyebrow">Stay in the know</p>
				<h2 class="editorial">Good things.<br /><em>First to you.</em></h2>
			</div>
			<div class="newsletter-form">
				<p>New collections, fresh perspectives and a little inspiration.</p>
				<form onsubmit={subscribe} novalidate>
					<label for="newsletter-email" class="sr-only">Your email address</label><input
						id="newsletter-email"
						type="email"
						bind:value={email}
						placeholder="Your email address"
						autocomplete="email"
						maxlength="254"
						required
						aria-invalid={invalid}
						aria-describedby="newsletter-feedback newsletter-note"
						oninput={() => {
							invalid = false;
							feedback = '';
						}}
					/><button type="submit" aria-label="Sign up for the newsletter">
						<Icon name="arrow" size={22} />
					</button>
				</form>
				<p id="newsletter-feedback" class="feedback" class:invalid role="status">{feedback}</p>
				<p id="newsletter-note" class="newsletter-note">
					A preview of what’s to come. <a href="/information/privacy">Privacy policy</a>
				</p>
			</div>
		</div>
		<div class="footer-links">
			<div class="footer-brand">
				<a class="footer-wordmark" href="/" aria-label="OLOYE home">OLOYE</a>
				<p>Contemporary by instinct.<br />Distinguished by design.</p>
				<span class="eyebrow">A global point of view</span>
			</div>
			{#each groups as group}<div class="link-group">
					<h3 class="eyebrow">{group.title}</h3>
					<ul>
						{#each group.links as link}<li>
								<a href={'href' in link ? link.href : `/information/${link.slug}`}>
									{link.label}{#if link.label === 'Instagram' || link.label === 'Pinterest'}<span
											aria-hidden="true"
										>
											↗
										</span>{/if}
								</a>
							</li>{/each}
					</ul>
				</div>{/each}
		</div>
		<div class="footer-bottom">
			<div>
				<p>© {new Date().getFullYear()} OLOYE. A Bitmason Labs portfolio concept.</p>
				<p class="concept-note">
					Styles, colours and prices are illustrative. Shopping opens at launch.
				</p>
			</div>
			<div class="payments">
				<div class="payment-marks" aria-label="Planned payment methods">
					<span class="visa">VISA</span><span class="mastercard">Mastercard</span><span>
						Apple Pay
					</span>
				</div>
				<p>Payment options planned for launch</p>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: var(--obsidian);
		color: var(--ivory);
	}
	.newsletter {
		display: grid;
		grid-template-columns: 1fr 1fr;
		padding-block: 3.5rem;
		border-bottom: 1px solid #e9e5dc30;
		gap: 3rem;
		align-items: center;
	}
	.newsletter .eyebrow {
		color: #c2b39a;
		margin-bottom: 1.25rem;
	}
	.newsletter h2 {
		font-size: clamp(3rem, 4.6vw, 4.7rem);
	}
	.newsletter em {
		font-weight: 400;
	}
	.newsletter-form {
		max-width: 440px;
		width: 100%;
		justify-self: end;
	}
	.newsletter-form > p:first-child {
		font-size: 0.76rem;
		line-height: 1.8;
		margin-bottom: 1.5rem;
	}
	form {
		display: flex;
		align-items: center;
		border-bottom: 1px solid var(--ivory);
	}
	input {
		width: 100%;
		background: transparent;
		border: 0;
		height: 50px;
		font-size: 0.78rem;
		min-width: 0;
	}
	input::placeholder {
		color: #c3c0b8;
	}
	form button {
		width: 48px;
		height: 50px;
		flex-shrink: 0;
		display: grid;
		place-items: center;
	}
	.newsletter-note,
	.feedback {
		font-size: 0.61rem;
		line-height: 1.7;
		color: #b9b5ad;
	}
	.feedback {
		margin-top: 0.75rem;
	}
	.feedback:empty {
		display: none;
	}
	.feedback.invalid {
		color: #f1b9bf;
	}
	.newsletter-note {
		margin-top: 1rem;
	}
	.newsletter-note a {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.footer-links {
		display: grid;
		grid-template-columns: 1.4fr 1fr 1fr 0.8fr;
		gap: 2rem;
		padding-block: 3.5rem;
	}
	.footer-wordmark {
		font-family: var(--font-editorial);
		font-size: 3.8rem;
		line-height: 1;
		letter-spacing: -0.055em;
	}
	.footer-brand p {
		font-size: 0.72rem;
		line-height: 1.8;
		color: #b9b5ad;
		margin: 1rem 0 1.5rem;
	}
	.footer-brand .eyebrow {
		font-size: 0.53rem;
		color: #b9b5ad;
	}
	.link-group h3 {
		font-size: 0.56rem;
		margin-bottom: 1.2rem;
		color: #c2b39a;
	}
	.link-group li {
		margin-block: 0.8rem;
	}
	.link-group a {
		font-size: 0.72rem;
	}
	.link-group a:hover {
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	.footer-bottom {
		border-top: 1px solid #e9e5dc30;
		display: flex;
		justify-content: space-between;
		gap: 1.5rem;
		padding-block: 1.6rem;
		font-size: 0.59rem;
		line-height: 1.8;
		color: #b9b5ad;
	}
	.concept-note {
		font-size: 0.54rem;
	}
	.payments {
		text-align: right;
	}
	.payment-marks {
		display: flex;
		align-items: center;
		justify-content: end;
		gap: 0.8rem;
		color: var(--ivory);
		margin-bottom: 0.4rem;
		font-size: 0.7rem;
	}
	.visa {
		font-weight: 600;
		font-style: italic;
		letter-spacing: 0.04em;
	}
	.mastercard {
		font-size: 0.62rem;
	}
	.payments p {
		font-size: 0.52rem;
	}
	@media (max-width: 760px) {
		.newsletter {
			grid-template-columns: 1fr;
			gap: 2rem;
			padding-block: 3rem;
		}
		.newsletter-form {
			justify-self: start;
			max-width: 100%;
		}
		.newsletter h2 {
			font-size: 3.5rem;
		}
		.footer-links {
			grid-template-columns: 1fr 1fr;
			gap: 2.5rem 1rem;
			padding-block: 2.5rem;
		}
		.footer-brand {
			grid-column: span 2;
		}
		.footer-brand p {
			margin-bottom: 1rem;
		}
		.footer-bottom {
			flex-direction: column;
			gap: 1rem;
		}
		.payments {
			text-align: left;
		}
		.payment-marks {
			justify-content: start;
		}
		.link-group a {
			display: inline-flex;
			min-height: 28px;
			align-items: center;
		}
		.link-group li {
			margin: 0.35rem 0;
		}
	}
</style>
