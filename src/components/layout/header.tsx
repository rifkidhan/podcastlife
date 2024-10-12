import Button from '$components/ui/button';
import { useUI } from '$lib/stores/ui';
import throttle from '$lib/utils/throttle';
import { Show, createEffect, createSignal, onCleanup } from 'solid-js';
import s from './header.module.css';
import SideNav from './side-nav';

export default function Header() {
	const [visible, setVisible] = createSignal(true);
	const [scroll, setScroll] = createSignal(0);
	const [lastScroll, setLastScroll] = createSignal(0);

	const { setMenuOpen, menuOpen } = useUI();

	createEffect(() => {
		const handleScroll = throttle(() => {
			setScroll(window.scrollY);
			setVisible((lastScroll() > scroll() && lastScroll() - scroll() > 70) || scroll() < 500);
			setLastScroll(scroll());
		}, 100);

		window.addEventListener('scroll', handleScroll);

		onCleanup(() => {
			window.removeEventListener('scroll', handleScroll);
		});
	});

	return (
		<>
			<header
				classList={{ [s.header]: true, [s.border]: scroll() > 70, [s.invisible]: !visible() }}
				inert={menuOpen()}
			>
				<div class={s.navigation}>
					<a href="/" class={s['title-wrapper']}>
						<span class={s.title}>podcastlife</span>
					</a>
					<div>
						<Button
							variant="picton"
							aria-label="open main navigation"
							aria-controls="side-navigation"
							aria-expanded={menuOpen()}
							icon="menu"
							onClick={() => setMenuOpen(true)}
						/>
					</div>
				</div>
			</header>

			<Show when={menuOpen()}>
				<SideNav />
			</Show>
		</>
	);
}
