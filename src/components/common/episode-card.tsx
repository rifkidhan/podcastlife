import Button from '$components/ui/button';
import Image from '$components/ui/image';
import Icon from '$components/ui/icon';
import LiveSign from './live-sign';
import { playerDetail } from '$lib/stores/player';
import type { AlternativeEnclosure } from '$lib/types';
import { getTime } from '$lib/utils/time';
import { Match, mergeProps, Show, splitProps, Switch } from 'solid-js';
import s from './episode-card.module.css';

interface EpisodeCardProps {
	type?: 'podcast' | 'live';
	feed: string;
	feedId: string;
	title: string;
	image: string;
	summary?: string;
	explicit?: boolean;
	guid: string;
	enclosure: string;
	altEnclosure?: AlternativeEnclosure[];
	// podcast
	episode?: number;
	publishedDate?: string;
	duration?: number;
	// live
	status?: 'live' | 'ended' | 'pending';
	start?: string;
	end?: string;
	// linked to feed
	linked?: boolean;
}

const LiveDateTime = (props: Pick<EpisodeCardProps, 'status' | 'start' | 'end'>) => {
	return (
		<>
			<Show when={props.status === 'live'}>
				<LiveSign />
			</Show>
			<span>
				<Switch>
					<Match when={props.status === 'live' && props.end}>
						end {getTime(props.end ? props.end : 0)}
					</Match>
					<Match when={props.status === 'pending' && props.start}>
						started {getTime(props.start ? props.start : 0)}
					</Match>
					<Match when={props.status === 'ended' && props.end}>
						ended {getTime(props.end ? props.end : 0)}
					</Match>
				</Switch>
			</span>
		</>
	);
};

const LiveTitle = (props: Pick<EpisodeCardProps, 'linked' | 'feedId' | 'title' | 'feed'>) => {
	return (
		<>
			<Show when={props.linked}>
				<a href={`/podcast/${props.feedId}`} class={`${s.title} ${s.link} ${s.linked} text-sm`}>
					<span>{props.feed}</span>
				</a>
			</Show>
			<h3>
				<span>{props.title}</span>
			</h3>
		</>
	);
};

const PodcastDateTime = (
	props: Pick<EpisodeCardProps, 'duration' | 'publishedDate' | 'episode'>
) => {
	const duration = props.duration ? props.duration : 0;
	return (
		<>
			<Show when={props.episode}>
				<span>Eps {props.episode}</span>
			</Show>
			<span>{getTime(props.publishedDate ? props.publishedDate : 0)}</span>
			<span>{Math.floor(duration / 60)} min</span>
		</>
	);
};

const PodcastTitle = (props: Pick<EpisodeCardProps, 'feedId' | 'guid' | 'title'>) => {
	return (
		<h3 class={s.title}>
			<a class={s.link} href={`/podcast/${props.feedId}/${btoa(encodeURI(props.guid))}`}>
				<span>{props.title}</span>
			</a>
		</h3>
	);
};

export default function EpisodeCard(props: EpisodeCardProps) {
	const { setPlayNow, playNow, paused, setPaused, loading } = playerDetail();
	const mergedProps = mergeProps(
		{
			type: 'podcast'
		},
		props
	);
	const [feed, live, podcast] = splitProps(
		mergedProps,
		['feed', 'feedId'],
		['end', 'start', 'status', 'linked']
	);
	const buttonPlay = () => {
		setPlayNow({
			feed: {
				id: feed.feedId,
				title: feed.feed
			},
			podcast: {
				title: podcast.title,
				image: podcast.image,
				enclosure: podcast.enclosure,
				guid: podcast.guid,
				altEnclosure: podcast.altEnclosure
			}
		});

		if (playNow().podcast.enclosure === podcast.enclosure) {
			setPaused(!paused());
		}
	};

	return (
		<div class={s['episode-card']}>
			<div class={s.img}>
				<Image src={podcast.image} alt={`${podcast.title} by ${feed.feed}`} full />
			</div>
			<div class={s.content}>
				<div
					class={`${s.time} text-sm`}
					classList={{ 'list-with-dot': podcast.type === 'podcast' }}
				>
					<Switch>
						<Match when={podcast.type === 'podcast'}>
							<PodcastDateTime {...podcast} />
						</Match>
						<Match when={podcast.type === 'live'}>
							<LiveDateTime {...live} />
						</Match>
					</Switch>
					<Show when={podcast.explicit}>
						<Icon name="explicit" size={18} />
					</Show>
				</div>
				<Switch>
					<Match when={podcast.type === 'podcast'}>
						<PodcastTitle title={podcast.title} guid={podcast.guid} feedId={feed.feedId} />
					</Match>
					<Match when={podcast.type === 'live'}>
						<LiveTitle
							linked={live.linked}
							title={podcast.title}
							feed={feed.feed}
							feedId={feed.feedId}
						/>
					</Match>
				</Switch>
				<Show when={podcast.summary}>
					<div class={`${s.summary} text-sm`} innerHTML={podcast.summary} />
				</Show>
			</div>

			<Button
				aria-label="Play podcast"
				icon={playNow().podcast.enclosure === podcast.enclosure && !paused() ? 'pause' : 'play'}
				aria-pressed={playNow().podcast.enclosure === podcast.enclosure && !paused()}
				variant="picton"
				class={s.play}
				onClick={buttonPlay}
				loading={playNow().podcast.enclosure === podcast.enclosure && loading()}
			/>
		</div>
	);
}
