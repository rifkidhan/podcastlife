import { createResource, For, Match, Show, Switch } from 'solid-js';
import { createVirtualizer } from '@tanstack/solid-virtual';
import transcript from '$lib/utils/transcript';
import s from './transcripts.module.css';

const getTranscript = async (url: string) => {
	const res = await fetch(url);

	const data = await res.text();
	return transcript(data);
};

export default function Transcripts(props: { url: string }) {
	const [transcripts] = createResource(props.url, getTranscript);

	let transcriptWrapper!: HTMLDivElement;

	const virtual = createVirtualizer({
		get count() {
			return transcripts()?.length ?? 20;
		},
		getScrollElement: () => transcriptWrapper,
		estimateSize: () => 60,
		overscan: 10
	});

	const virtualItems = virtual.getVirtualItems();

	return (
		<div data-transcripts ref={transcriptWrapper} class={s.transcripts}>
			<div class={s['transcripts-wrapper']} style={{ height: `${virtual.getTotalSize()}px` }}>
				<ul style={{ transform: `translateY(${virtualItems[0]?.start ?? 0}px)` }}>
					<Switch>
						<Match when={transcripts.loading}>
							<li>Loading</li>
						</Match>
						<Match when={transcripts.error}>
							<li>{transcripts.error.message}</li>
						</Match>
						<Match when={transcripts()}>
							<For each={virtualItems}>
								{(item) => {
									const transcript = transcripts()[item.index];

									return (
										<li
											class={s['transcript-item']}
											ref={(el) => queueMicrotask(() => virtual.measureElement(el))}
											data-index={item.index}
										>
											<Show when={transcript.speaker}>
												<span class={s.speaker}>{transcript.speaker}</span>
											</Show>
											<span>{transcript.body}</span>
										</li>
									);
								}}
							</For>
						</Match>
					</Switch>
				</ul>
			</div>
		</div>
	);
}
