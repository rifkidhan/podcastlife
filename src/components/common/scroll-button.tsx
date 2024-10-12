import Button from '$components/ui/button';
import { getWindowScroll } from '$lib/utils/helper';
import { Show } from 'solid-js';

export default function ScrollButton() {
	const [scroll] = getWindowScroll();

	const buttonEvent = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<Show when={scroll() > 1000}>
			<div class="scroll-button">
				<Button
					type="button"
					aria-label="scroll to top"
					icon="move-up"
					circle
					onclick={buttonEvent}
				/>
			</div>
		</Show>
	);
}
