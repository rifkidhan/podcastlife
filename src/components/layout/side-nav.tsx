import Button from '$components/ui/button';
import { useUI } from '$lib/stores/ui';
import { categories } from '$lib/utils/constants';
import { For, Match, Switch, createSignal, onCleanup, onMount } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import { Portal } from 'solid-js/web';
import s from './side-nav.module.css';
import ThemeSwitcher from './theme-switcher';

const menuItems = [
	{
		href: '/',
		title: 'Home'
	},
	{
		href: '/categories',
		title: 'Categories'
	},
	{
		href: '/live',
		title: 'Live Podcast'
	},
	{
		href: '/about',
		title: 'About'
	}
];

interface ListProps extends ComponentProps<'a'> {
	href: string;
}

const ListItem = (props: ListProps) => {
	return (
		<li class={s['list-item']}>
			<a onClick={props.onClick} href={props.href}>
				<span>{props.children}</span>
			</a>
		</li>
	);
};

export default function SideNav() {
	const [transition, setTransition] = createSignal(false);
	const { setMenuOpen, menuOpen } = useUI();

	const main = document.getElementById('main-content') as HTMLElement;
	const footer = document.querySelector('footer') as HTMLElement;

	let closeButttonRef!: HTMLButtonElement;
	let sideNav!: HTMLDivElement;

	const lightDismiss = (e: MouseEvent) => {
		if (!sideNav.contains(e.target as Node)) {
			setTransition(false);
		}
	};

	onMount(() => {
		setTransition(true);
		main.setAttribute('inert', '');
		footer.setAttribute('inert', '');
		closeButttonRef.focus();

		document.addEventListener('click', lightDismiss);
	});

	onCleanup(() => {
		main.removeAttribute('inert');
		footer.removeAttribute('inert');
		document.removeEventListener('click', lightDismiss);
	});

	return (
		<Portal>
			<div class={s.backdrop} tabindex="-1" aria-hidden="true" inert />
			<div
				id="side-mavigation"
				class={s['side-nav']}
				ref={sideNav}
				onkeydown={(e) => {
					if (e.key === 'Escape') {
						setTransition(false);
					}
				}}
				data-sidenav-open={transition()}
				tabindex="0"
				ontransitionend={() => {
					if (menuOpen() && !transition()) {
						setMenuOpen(false);
					}
				}}
			>
				<nav class={s.wrapper}>
					<div class={s.top}>
						<ThemeSwitcher />
						<Button
							variant="picton"
							aria-label="Close side navigation"
							icon="close"
							ref={closeButttonRef}
							onClick={() => setTransition(false)}
						/>
					</div>
					<ul class={s.list}>
						<For each={menuItems}>
							{(menu) => (
								<Switch>
									<Match when={menu.title === 'Categories'}>
										<li>
											<details class={s.details}>
												<summary>
													{menu.title}
													<span>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="24"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="2"
															stroke-linecap="round"
															stroke-linejoin="round"
															aria-hidden="true"
															class={s.detail}
														>
															<path d="M5 12h14" />
															<path class={s.rotate} d="M12 5v14" />
														</svg>
													</span>
												</summary>
												<ul class={s.sub}>
													<ListItem href={menu.href} onClick={() => setMenuOpen(false)}>
														All Categories
													</ListItem>
													<For each={categories}>
														{(item) => (
															<ListItem
																href={`/categories/${item.id}`}
																onClick={() => setMenuOpen(false)}
															>
																{item.title}
															</ListItem>
														)}
													</For>
												</ul>
											</details>
										</li>
									</Match>
									<Match when={menu.title !== 'Categories'}>
										<ListItem href={menu.href} onClick={() => setMenuOpen(false)}>
											{menu.title}
										</ListItem>
									</Match>
								</Switch>
							)}
						</For>
					</ul>
				</nav>
			</div>
		</Portal>
	);
}
