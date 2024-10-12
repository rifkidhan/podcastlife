import { createResource, For, Match, Show, Switch } from 'solid-js';
import { createVirtualizer } from '@tanstack/solid-virtual';
import Image from '$components/ui/image';
import s from './chapters.module.css';

interface Chapter {
	startTime: number;
	title: string;
	img?: string;
	url?: string;
}

const getChapters = async (url: string): Promise<Chapter[]> => {
	const res = await fetch(url);

	const data = await res.json();
	return data.chapters;
};
export default function Chapters(props: { url: string }) {
	const [chapters] = createResource(props.url, getChapters);

	let chapterWrapper!: HTMLDivElement;

	const virtual = createVirtualizer({
		get count() {
			return chapters()?.length ?? 20;
		},
		getScrollElement: () => chapterWrapper,
		estimateSize: () => 60,
		overscan: 10,
		gap: 10
	});

	return (
		<div data-chapters ref={chapterWrapper} class={s.chapters}>
			<ul style={{ height: `${virtual.getTotalSize()}px` }}>
				<Switch>
					<Match when={chapters.loading}>
						<li>Loading</li>
					</Match>
					<Match when={chapters.error}>
						<li>{chapters.error.message}</li>
					</Match>
					<Match when={chapters()}>
						<For each={virtual.getVirtualItems()}>
							{(item) => {
								const chapter = chapters()[item.index];

								return (
									<li
										class={s['chapter-item']}
										style={{ height: `${item.size}px`, transform: `translateY(${item.start}px)` }}
									>
										<Show when={chapter.img}>
											<span class={s['chapter-thumbnail']}>
												<Image src={chapter.img ?? ''} alt={chapter.title} full />
											</span>
										</Show>
										<span>{chapter.title}</span>
									</li>
								);
							}}
						</For>
					</Match>
				</Switch>
			</ul>
		</div>
	);
}
