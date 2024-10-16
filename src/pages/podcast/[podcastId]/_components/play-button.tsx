import Button from '$components/ui/button';
import { playerDetail } from '$lib/stores/player';
import type { FeedPlaying, PodcastPlaying } from '$lib/stores/player';
import { createMemo } from 'solid-js';

type PlayButtonProps = PodcastPlaying & {
	feed: FeedPlaying;
	feedImage?: string;
};

export default function PlayButton(props: PlayButtonProps) {
	const { setPaused, loading, paused, queue, setQueue } = playerDetail();

	const isThisPodcast = createMemo(() => queue.now.podcast.enclosure === props.enclosure);

	const isPlaying = createMemo(() => isThisPodcast() && !paused());

	const isLoading = createMemo(() => isThisPodcast() && loading());

	const setPlaying = () => {
		if (!isThisPodcast()) {
			setQueue('now', {
				feed: props.feed,
				podcast: {
					guid: props.guid,
					title: props.title,
					image: props.image,
					explicit: props.explicit,
					enclosure: props.enclosure,
					altEnclosure: props.altEnclosure
				}
			});
		} else {
			setPaused(!paused());
		}
	};
	return (
		<Button
			type="button"
			variant="cerise"
			size="fit"
			icon={isPlaying() ? 'pause' : 'play'}
			loading={isLoading()}
			aria-pressed={isThisPodcast() && !paused()}
			onClick={setPlaying}
		>
			{isPlaying() ? 'Pause' : 'Play'}
		</Button>
	);
}
