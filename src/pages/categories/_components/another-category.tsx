import { createWindowVirtualizer } from '@tanstack/solid-virtual';
import type { BasicFeed, PodcastByCategory } from '$lib/types';
import { createSignal, For, Show, createResource, Switch, Match, createMemo } from 'solid-js';
import Image from '$components/ui/image';
import Button from '$components/ui/button';
import s from './another-category.module.css';
import { getTime } from '$lib/utils/time';
import Icon from '$components/ui/icon';
import { ORIGIN } from 'astro:env/client';
import { getWindowSize } from '$lib/utils/helper';

interface AnotherCategoryProps {
	category: string;
}

const fetchCategory = async ({
	category,
	cursor
}: {
	category: string;
	cursor?: string;
}): Promise<PodcastByCategory | undefined> => {
	const url = new URL(`/api/categories/${category}.json`, ORIGIN);

	if (cursor) {
		url.searchParams.append('c', cursor);
	}

	const res = await fetch(url, {
		method: 'GET'
	});

	return res.json();
};

const Card = (props: BasicFeed) => {
	return (
		<a href={`/podcast/${props.id}`} class={s.card}>
			<div class={s.thumbnail}>
				<Image src={props.image} alt={props.title} blurdata={props.blurhash} full />
			</div>
			<div class={s.content}>
				<div class={`${s.misc} list-with-dot text-sm`}>
					<span>{getTime(props.newestItemPubdate)}</span>
					<Show when={props.explicit}>
						<Icon name="explicit" size={18} />
					</Show>
				</div>
				<h3 class={s.title}>{props.title}</h3>
				<Show when={props.description}>
					<div class={`${s.description} text-sm`} innerText={props.description} />
				</Show>
			</div>
		</a>
	);
};

const CardPlaceHolder = () => {
	return (
		<div class={`${s.card} ${s.placeholder}`}>
			<div class={s['thumbnail-placeholder']} />
			<div class={s['content-placeholder']}>
				<div class={s['time-placeholder']} />
				<div class={s['title-placeholder']} />
				<div class={s['description-placeholder']} />
			</div>
		</div>
	);
};

export default function AnotherCategory(props: AnotherCategoryProps) {
	const [data, { mutate }] = createResource({ category: props.category }, fetchCategory);
	const [state, setState] = createSignal<'ready' | 'loading' | 'error'>('ready');
	const [windowSize] = getWindowSize();

	const virtualItemSize = createMemo(() => {
		if (windowSize() <= 412) return 100;
		if (windowSize() > 412 && windowSize() < 768) return 120;

		return 150;
	});

	const virtual = createWindowVirtualizer({
		get count() {
			return data()?.data.length ?? 30;
		},
		estimateSize: virtualItemSize,
		overscan: 10,
		gap: 16
	});

	const addMore = async () => {
		if (!data()?.meta.page.more) return;

		setState('loading');

		const res = await fetchCategory({ category: props.category, cursor: data()?.meta.page.cursor });

		if (!res) {
			setState('error');
			return;
		}

		mutate((item) => ({
			data: [...item.data, ...res.data],
			meta: res.meta
		}));

		setState('ready');
	};

	return (
		<>
			<ul style={{ height: `${virtual.getTotalSize()}px` }} class={s['virtual-list-wrapper']}>
				<Switch>
					<Match when={data.loading}>
						<For each={Array(30).fill(0)}>{(_) => <CardPlaceHolder />}</For>
					</Match>
					<Match when={data.error}>{data.error.message}</Match>
					<Match when={data()}>
						<For each={virtual.getVirtualItems()}>
							{(item) => {
								const feed = data().data[item.index];
								return (
									<li
										style={{ height: `${item.size}px`, transform: `translateY(${item.start}px)` }}
										data-index={item.index}
										class={s['list-item']}
									>
										<Card {...feed} />
									</li>
								);
							}}
						</For>
					</Match>
				</Switch>
			</ul>
			<Switch
				fallback={
					<Button type="button" size="full" onClick={addMore}>
						Refetch
					</Button>
				}
			>
				<Match when={data()?.meta.page.more && state() === 'ready'}>
					<Button type="button" size="full" onClick={addMore}>
						Add More
					</Button>
				</Match>
				<Match when={state() === 'loading'}>
					<For each={Array(30).fill(0)}>{(_) => <CardPlaceHolder />}</For>
				</Match>
			</Switch>
		</>
	);
}
